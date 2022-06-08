from django.urls import path
from .views import VisitCreateAPIView, ListVisitsAPIView, get_visit, get_doctor_visits, get_patient_visits, \
    delete_visit, get_free_slots


urlpatterns = [
    path('create_visit/', VisitCreateAPIView.as_view(), name='create_visit'),
    path('list_visits/', ListVisitsAPIView.as_view(), name='list_visits'),
    path('list_visits/<int:id>', get_visit),
    path('list_doctor_visits/<int:doctor_id>', get_doctor_visits),
    path('list_patient_visits/<int:patient_id>', get_patient_visits),
    path('delete_visit/', delete_visit),
    path('get_free_slots/<int:doctor_id>/<str:visit_date>', get_free_slots),
]
