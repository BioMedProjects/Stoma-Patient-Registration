from django.urls import path

from .views import UserCreateAPIView, UserLoginAPIView, logout, ListUsersAPIView, get_doctors, get_doctor

urlpatterns = [
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('register/', UserCreateAPIView.as_view(), name='register'),
    path('logout/', logout, name='logout'),
    path('users/', ListUsersAPIView.as_view(), name='users'),
    path('doctors/', get_doctors, name='doctors'),
    path('doctors/<int:id>', get_doctor),
]
