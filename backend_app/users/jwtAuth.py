import os, jwt
from datetime import datetime, timedelta
from rest_framework.exceptions import ValidationError

SECRET_KEY = 'django-insecure-d2mwzt4-ley&odhigwg24@h+!61!l0((b+y4@eqbzg1+(ukh-r'
JWT_ALGORITHM = 'HS256'
JWT_EXP_REFRESH_HOURS = timedelta(days=3)
JWT_EXP_ACCESS_MINUTES = timedelta(days=1)


def get_access_token(account):
    payload = {
        'token_type': 'access',
        'user_id': str(account.id),
        'exp': datetime.utcnow() + JWT_EXP_ACCESS_MINUTES
    }
    jwt_access_token = jwt.encode(payload, SECRET_KEY, JWT_ALGORITHM)
    return jwt_access_token


def get_refresh_token(account):
    payload = {
        'token_type': 'refresh',
        'user_id': str(account.id),
        'exp': datetime.utcnow() + JWT_EXP_REFRESH_HOURS
    }
    jwt_refresh_token = jwt.encode(payload, SECRET_KEY, JWT_ALGORITHM)
    return jwt_refresh_token


def check_refresh_token(refresh_token):
    user_payload_info =  jwt.decode(refresh_token, SECRET_KEY, JWT_ALGORITHM, options={"verify_signature": True})
    print(user_payload_info)
    if user_payload_info:
        if user_payload_info['token_type'] == 'refresh':
            return user_payload_info
        else:
            raise ValidationError(detail={"error" : 'Token type did not match.'})


def check_access_token(access_token):
    user_payload_info = jwt.decode(access_token, SECRET_KEY, JWT_ALGORITHM, options={"verify_signature": True})
    if user_payload_info:
        if user_payload_info['token_type'] == 'access':
            return user_payload_info
        else:
            raise ValidationError(detail={"error" : 'Token type did not match.'})