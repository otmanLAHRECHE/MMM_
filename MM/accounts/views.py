import datetime
from os import stat
from wsgiref.util import request_uri
from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from calendar import monthrange
from dateutil.relativedelta import relativedelta



@api_view(['GET'])
def getAllUsers(request):
    if request.method == 'GET' and request.user.is_authenticated and request.user.is_superuser:
        queryset = User.objects.all()

        serial = UserSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=serial.data)

    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  



@api_view(['GET'])
def getAllUsersForLogin(request):
    if request.method == 'GET':
        queryset = User.objects.all()

        serial = UserLoginSerialize(queryset, many=True)

        print(serial.data)

        return Response(status=status.HTTP_200_OK,data=serial.data)

    else :
        return Response(status=status.HTTP_400_BAD_REQUEST)  

