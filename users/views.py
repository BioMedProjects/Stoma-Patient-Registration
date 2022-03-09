from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .serializers import UserCreateSerializer, UserLoginSerializer

from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

import json


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()


class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        # request.POST
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            new_data['user_id'] = User.objects.filter(
                username=new_data['username'],
                email=new_data['email'],
            ).first().id
            return Response(new_data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    print("request: ", request.data)
    token_string = json.loads(request.data)
    print("token_string: ", token_string)
    token_to_delete = Token.objects.filter(key=token_string)
    print("token to delete: ", token_to_delete)
    if token_to_delete:
        token_to_delete.delete()
        return Response(status=HTTP_200_OK)
    return Response(status=HTTP_400_BAD_REQUEST)
