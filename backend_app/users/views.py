from datetime import timezone
import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import (CustomUser, Ticket, TokenAuth)
from .serializers import PermissionSerializer, RoleSerializer, SignUpSerializer, LoginSerializer, TokenSerializer, LogoutSerializer, TickerSerializer
from .jwtAuth import get_refresh_token, get_access_token
from .utils import validate_access_token, get_object
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView, RetrieveAPIView,
                                     RetrieveUpdateAPIView, UpdateAPIView)
from django.contrib.auth.models import Group, Permission

class SignUpView(APIView):

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': "Registration Successful.Please Login!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validate_user_cred(serializer.validated_data)
            token_user = TokenAuth.objects.filter(account__email__contains=user.email, is_validated=True, logged_in=True)
            if token_user:
                token_user.update(is_validated=False, logged_in=False)
            refresh_token = str(get_refresh_token(user))
            access_token = str(get_access_token(user))
            tokenModel = TokenAuth.objects.create(
                account=user,
                is_validated=True,
                logged_in=True,
                refresh_token=refresh_token
            )
            tokenModel.save()
            response = {
                'name': user.name,
                'mobile': user.mobile,
                'email': user.email,
                'user_type': user.user_type,
                'refresh_token': refresh_token,
                'access_token': access_token,
                'user_id': user.id,
            }
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenGenerateView(APIView):

    def post(self, request):
        serializer = TokenSerializer(data=request.data)
        if serializer.is_valid():
            response = serializer.generate_token(serializer.validated_data)
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        if serializer.is_valid():
            response = serializer.logout_user(serializer.validated_data)
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.parsers import JSONParser
class TicketCreateView(APIView):

    @validate_access_token
    def post(self, request):
        payload = request.data
        print(payload)
        try:
            create  = Ticket.objects.create(
                title = payload['title'],
                description = payload['description'],
                initiator_id = request.user['user_id'],
                priority = payload['priority'],
                request_type = payload['request_type'],

            )
            return Response(data={"success":True,"message":"Ticket create successfull!","inserted_id" : create.id},status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message' : 'Ticker creation failed error','error' : str(e)}, status=status.HTTP_400_BAD_REQUEST)



class TicketUpdateView(APIView):

    @validate_access_token
    def put(self, request, pk):
        payload = request.data
        print(request.user)
        ticket  =  Ticket.objects.filter(pk=pk)
        if ticket.exists():
            update = ticket.update(
                **payload,
                updated_date =  datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                updated_by_id = request.user['user_id']
                # title = payload['title'],
                # description = payload['description'],
                # priority = payload['priority'],
                # request_type = payload['request_type'] if 'request_type' in payload else ticket.values().first().get('request_type'),
                # assigne_id = payload['assigne'] if 'assigne' in payload else ticket.values().first().get('assigne_id'),
                # resolve_status = payload['resolve_status'] if 'resolve_status' in payload else ticket.values().first().get('resolve_status'),
            )
            return Response({'msg': 'Ticket updated'},status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Ticket not found, Updating failed!'},status=status.HTTP_200_OK)


class TicketListView(APIView):

    @validate_access_token
    def get(self,request):
        products = Ticket.objects.all().values()

        result = []

        for item in products:
            try:
                item['assigne_name'] =  CustomUser.objects.get(pk=item['assigne_id']).name
                item['initiator_name'] =  CustomUser.objects.get(pk=item['initiator_id']).name
            except Exception as e:
                item['assigne_name'] =  None
                item['initiator_name'] = None

            result.append(item)
        # serializered = TickerSerializer(instance=products, many=True)
        # print("print::",serializered.data)
        return Response(data=result, status=status.HTTP_200_OK)
        # return Response({'error': "No products found."}, status=status.HTTP_404_NOT_FOUND)


class TicketDetailView(APIView):

    @validate_access_token
    def get(self, request, pk):
        product =  Ticket.objects.filter(pk=pk).values().first()
        return Response(product, status=status.HTTP_200_OK)


class PermissionList(ListAPIView):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    pagination_class = None

class RoleListView(ListAPIView):
    serializer_class = RoleSerializer
    queryset = Group.objects.all()
    pagination_class = None


class RoleCreateView(CreateAPIView):
    serializer_class = RoleSerializer
    queryset = Group.objects.all()

class EmployeeView(APIView):

    @validate_access_token
    def get(self,request):
        employees = CustomUser.objects.filter(user_type='employee').values()
        return Response(data=employees, status=status.HTTP_200_OK)

    @validate_access_token
    def post(self,request):
        payload = request.data
        if payload['role'] != 'employee':
            Response({'msg': "Employee Creation faild,Role must be employee type."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': "Employee Creation Successful.Please Login!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @validate_access_token
    def put(self,request):
        payload = request.data
        if payload['role'] != 'employee':
            Response({'msg': "Employee Update faild,Role must be employee type."}, status=status.HTTP_400_BAD_REQUEST)
        
        employee = CustomUser.objects.filter(id=payload['id'],user_type='employee')
        if employee.exists():

            employee.update(
                name = payload['name'],
                email = payload['email'],
                mobile = payload['mobile'],
            )

            return Response({'msg': "Employee update Successful"}, status=status.HTTP_201_CREATED)

        else:
            return Response({'msg': "Employee update failed!"}, status=417)

class StudentView(APIView):

    @validate_access_token
    def get(self,request):
        student = CustomUser.objects.filter(user_type='student').values()
        return Response(data=student, status=status.HTTP_200_OK)

    @validate_access_token
    def post(self,request):
        payload = request.data
        if payload['role'] != 'student':
            Response({'msg': "Student Creation faild,Role must be student type."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': "Student Creation Successful.Please Login!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @validate_access_token
    def put(self,request):
        payload = request.data
        if payload['role'] != 'student':
            Response({'msg': "Student Update faild,Role must be student type."}, status=status.HTTP_400_BAD_REQUEST)
        
        student = CustomUser.objects.filter(id=payload['id'],user_type='student')
        if student.exists():

            student.update(
                name = payload['name'],
                email = payload['email'],
                mobile = payload['mobile'],
            )

            return Response({'msg': "Student update Successful"}, status=status.HTTP_201_CREATED)

        else:
            return Response({'msg': "Student update failed!"}, status=417)


class EmployeeViewGetByID(APIView):

    @validate_access_token
    def get(self, request, pk):
        employee = CustomUser.objects.filter(pk=pk,user_type='employee').values().first()
        return Response(data=employee, status=status.HTTP_200_OK)

class StudentViewGetByID(APIView):

    @validate_access_token
    def get(self, request, pk):
        student = CustomUser.objects.filter(pk=pk,user_type='student').values().first()
        return Response(data=student, status=status.HTTP_200_OK)

class DashboardView(APIView):

    @validate_access_token
    def get(self, request):
        data = Ticket.objects.all().values()
        return Response(data=data, status=status.HTTP_200_OK)