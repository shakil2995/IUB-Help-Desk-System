from rest_framework.exceptions import APIException, ValidationError
from rest_framework import status
from rest_framework.response import Response
from .jwtAuth import check_access_token
from jwt.exceptions import *
from .models import Ticket

class CustomExcpetion(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Custom Exception Message"
    default_code = 'error'

    def __init__(self, detail, status_code=None):
        self.detail = detail
        if status_code is not None:
            self.status_code = status_code


def validate_access_token(func):
    def wrapper(self, request, *args, **kwargs):
        try: 
            info = check_access_token(request.META.get('HTTP_AUTHORIZATION').replace('Bearer ', ''))
            request.user = info
            return func(self, request, *args, **kwargs)
        except KeyError as keyErr:
            print(keyErr)
            return Response({"error": "Token is not provided","detail" : "Token is not provided"}, status=status.HTTP_401_UNAUTHORIZED)
        except AttributeError as attrError:
            print(attrError)
            return Response({"msg": "Token is not provided","detail" : "Token is not provided"}, status=status.HTTP_401_UNAUTHORIZED)
        except ValidationError as e:
            print(e)
            return Response(e.detail, status=status.HTTP_401_UNAUTHORIZED)
        except ExpiredSignatureError as e:
            print(e)
            return Response({"error": "Access token has expired."}, status=status.HTTP_401_UNAUTHORIZED)
        except InvalidAlgorithmError as e:
            print(e)
            return Response({"error": "Algorithm is not allowed."}, status=status.HTTP_401_UNAUTHORIZED)
        except InvalidSignatureError as e:
            print(e)
            return Response({"error": "Signature verification failed."}, status=status.HTTP_401_UNAUTHORIZED)
        except DecodeError as e:
            print(e)
            return Response({"error": "Access token decode error."}, status=status.HTTP_401_UNAUTHORIZED)
        
    return wrapper


def get_object(pk):
    try:
        return Ticket.objects.get(id=pk)
    except Ticket.DoesNotExist:
        raise CustomExcpetion(detail={"error": "Ticket ID does not exist."}, status_code=status.HTTP_400_BAD_REQUEST)

