from django.urls import path
from .views import VisitCreateAPIView, ListVisitsAPIView, get_visit

urlpatterns = [
    path('create_visit/', VisitCreateAPIView.as_view(), name='create_visit'),
    path('list_visits/', ListVisitsAPIView.as_view(), name='list_visits'),
    path('list_visits/<int:id>', get_visit),
]
