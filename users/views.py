from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .serializers import UserCreateSerializer, UserLoginSerializer

from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token


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
    print("request: ", request.data, type(request.data))
    token_to_delete = Token.objects.filter(key=request.data['data'])
    print("token to delete: ", token_to_delete)
    if token_to_delete:
        token_to_delete.delete()
        return Response(status=HTTP_200_OK)
    return Response(status=HTTP_400_BAD_REQUEST)


class ListUsersAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        data = [{
            "id": obj.id,
            "is_staff": obj.is_staff,
            "first_name": obj.first_name,
            "last_name": obj.last_name,
            "username": obj.username,
            "email": obj.email,
        } for obj in User.objects.all()]
        return Response(data)


@api_view(['GET'])
def get_doctors(request):
    data = [{
        "id": obj.id,
        "is_staff": obj.is_staff,
        "first_name": obj.first_name,
        "last_name": obj.last_name,
        "username": obj.username,
        "email": obj.email,
    } for obj in User.objects.filter(is_staff=True)]
    if data:
        return Response(data=data, status=HTTP_200_OK)
    else:
        return Response(data="No registered doctors", status=HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_doctor(request, id):
    data = [{
        "id": obj.id,
        "is_staff": obj.is_staff,
        "first_name": obj.first_name,
        "last_name": obj.last_name,
        "username": obj.username,
        "email": obj.email,
    } for obj in User.objects.filter(id=id, is_staff=True)]
    if data:
        return Response(data=data, status=HTTP_200_OK)
    else:
        return Response(data="There is no doctor with such id", status=HTTP_400_BAD_REQUEST)
