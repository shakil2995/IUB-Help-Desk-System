import re
from django.contrib.auth.hashers import make_password
from rest_framework import serializers, status
from rest_framework.serializers import ValidationError
from .models import CustomUser, TokenAuth,Ticket
from .jwtAuth import check_refresh_token, get_refresh_token, get_access_token
from jwt.exceptions import *
from .utils import CustomExcpetion
from django.contrib.auth.models import Group, Permission

def validate_email(value):
    lower_email = value.lower()
    if CustomUser.objects.filter(email__iexact=lower_email).exists():
        msg = {
            "error": "Email already exist!"
        }
        raise ValidationError(detail=msg)
    return lower_email

def validate_role(value):
    return value
    # if Group.objects.filter(name__iexact=value).exists():
    #     return value
    # else:
    #     msg = {
    #         "error": "Role Group not exist!"
    #     }
    #     raise ValidationError(detail=msg)
    

def match_not_found():
    msg = {
        "error": "Passwords do not match"
    }
    raise ValidationError(detail=msg)


def validate_password(password, confirm_password):
    if password == confirm_password:
        if re.match(r"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", password):
            return make_password(password)
        else:
            msg = {
                "error": "Password must be a minimum of eight characters with at least one uppercase letter, "
                         "one lowercase letter, one digit and one special character. "
            }
            raise ValidationError(detail=msg)
    else:
        match_not_found()


def validate_mobile(mobile):
    if re.match(r'^\d{9,15}$',
                mobile.replace("-", '').replace(" ", '').replace("(", '').replace(")", '').replace("+", '')):
        return mobile
    else:
        msg = {
            "error": "Insert a valid phone number."
        }
        raise ValidationError(detail=msg)


class SignUpSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=True)
    email = serializers.EmailField(max_length=255, required=True)
    mobile = serializers.CharField(max_length=255, required=True)
    mobile = serializers.CharField(max_length=255, required=True)
    password = serializers.CharField(max_length=255, required=True)
    confirm_password = serializers.CharField(max_length=255, required=True)
    role = serializers.CharField(max_length=255, required=True)

    @staticmethod
    def create(validated_data):
        name = validated_data['name']
        valid_mobile = validate_mobile(validated_data['mobile'])
        valid_email = validate_email(validated_data['email'])
        valid_role = validate_role(validated_data['role'])
        valid_password = validate_password(validated_data['password'], validated_data['confirm_password'])

        user = CustomUser.objects.create(
            name = name,
            email = valid_email,
            mobile = valid_mobile,
            password = valid_password,
            user_type = valid_role,
            is_admin =  True if valid_role == 'admin' else False,
            is_staff = True if valid_role == 'admin' else False
        )
        if user:
            user.save()
        return True


def wrong_credentials():
    msg = {
        "error": "Invalid credentials."
    }
    raise ValidationError(detail=msg)


def user_inactive():
    msg = {
        'error': "Account disabled for inactivity, contact admin."
    }
    raise ValidationError(detail=msg)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, required=True)
    password = serializers.CharField(max_length=255, required=True)

    @staticmethod
    def validate_user_cred(validated_data):
        email = validated_data['email']
        password = validated_data['password']
        users = CustomUser.objects.filter(email=email)
        if len(users) > 0:
            user = users[0]
            if not user.check_password(password):
                wrong_credentials()
            if not user.is_active:
                user_inactive()
        else:
            wrong_credentials()
        return user


def refresh_token_exceptions(detail, status_code):
    raise CustomExcpetion(detail=detail, status_code=status_code)


def get_token_user(refresh_token):
    try: 
        payload_info = check_refresh_token(refresh_token)
        if payload_info:
            user = CustomUser.objects.filter(id=payload_info['user_id'])
            if len(user) > 0:
                return user[0]
    except ValidationError:
        refresh_token_exceptions(detail={"error": "Refresh token type did not match."}, status_code=status.HTTP_401_UNAUTHORIZED)
    except ExpiredSignatureError:
        refresh_token_exceptions(detail={"error": "Refresh token expired."}, status_code=status.HTTP_401_UNAUTHORIZED)
    except InvalidAlgorithmError:
        refresh_token_exceptions(detail={"error": "Algorithm is not allowed."}, status_code=status.HTTP_401_UNAUTHORIZED)
    except InvalidSignatureError:
        refresh_token_exceptions(detail={"error": "Signature verification failed."}, status_code=status.HTTP_401_UNAUTHORIZED)
    except DecodeError:
        refresh_token_exceptions(detail={"error": "Refresh token decode error."}, status_code=status.HTTP_401_UNAUTHORIZED)


class TokenSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    @staticmethod
    def generate_token(validated_data):
        refresh_token = validated_data['refresh_token']
        user_id = get_token_user(refresh_token)
        token_user = TokenAuth.objects.filter(account_id=user_id.id, is_validated=True,
                                                logged_in=True, refresh_token=refresh_token)
        if token_user:
            generate_refresh_token = get_refresh_token(user_id)
            generate_access_token = get_access_token(user_id)
            token_user.update(refresh_token=generate_refresh_token)
            return {
                "access_token": generate_access_token,
                "refresh_token": generate_refresh_token
            }
        else:
            refresh_token_exceptions(detail={"error": "Refresh token did not match."}, status_code=status.HTTP_401_UNAUTHORIZED)



class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    @staticmethod
    def logout_user(validated_data):
        refresh_token = validated_data['refresh_token']
        user_id = get_token_user(refresh_token)
        token_user = TokenAuth.objects.filter(account_id=user_id.id, is_validated=True,
                                                logged_in=True, refresh_token=refresh_token)
        if token_user:
            token_user.update(is_validated=False, logged_in=False)
            return {
                'success': 'Logged out successfully!'
            }
        else:
            refresh_token_exceptions(detail={"error": "Refresh token did not match."}, status_code=status.HTTP_401_UNAUTHORIZED)


def user_not_exist():
    msg = {
        "error": "User does not exist."
    }
    raise ValidationError(detail=msg)


def validate_user(user_id):
    users = CustomUser.objects.filter(id=user_id)
    if len(users) > 0:
        user_id = users[0]
        if user_id.is_active:
            return user_id
        else:
            user_inactive()
    else:
        user_not_exist()

class TickerSerializer(serializers.Serializer):

    class Meta:
        model = Ticket
        fields = "__all__"

# class ProductSerializer(serializers.Serializer):
#     id = serializers.IntegerField(required=False)
#     title = serializers.CharField(max_length=255)
#     description = serializers.CharField()
#     price = serializers.DecimalField(max_digits=6, decimal_places=2)

#     @staticmethod
#     def create(validated_data):        
#         title = validated_data['title']
#         description = validated_data['description']
#         price = validated_data['price']
#         product = Product.objects.create(
#             title = title,
#             description = description,
#             price = price
#         )
#         if product:
#             product.save()
#         return product.title
    
#     @staticmethod
#     def update(instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.description = validated_data.get('description', instance.description)
#         instance.price = validated_data.get('price', instance.price)
#         instance.save()
#         print(instance)
#         return instance

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'