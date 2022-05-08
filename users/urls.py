from django.urls import path

from .views import UserCreateAPIView, UserLoginAPIView, logout, ListPatientsAPIView, ListDoctorsAPIView, get_doctor, get_patient

urlpatterns = [
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('register/', UserCreateAPIView.as_view(), name='register'),
    path('logout/', logout, name='logout'),
    path('patients/', ListPatientsAPIView.as_view(), name='patients'),
    path('patients/<int:id>', get_patient),
    path('doctors/', ListDoctorsAPIView.as_view(), name='doctors'),
    path('doctors/<int:id>', get_doctor),
]
