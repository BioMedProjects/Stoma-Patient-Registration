import datetime

from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.views import APIView

from .models import Visit
from .serializers import VisitSerializer
from .utils import get_slots

# Create your views here.

class VisitCreateAPIView(CreateAPIView):
    serializer_class = VisitSerializer
    queryset = Visit.objects.all()


class ListVisitsAPIView(APIView):

    def get(self, request):
        data = [{
            "id": obj.id,
            "first_patient_name": obj.first_patient_name,
            "last_patient_name": obj.last_patient_name,
            "first_doctor_name": obj.first_doctor_name,
            "last_doctor_name": obj.last_doctor_name,
            "visit_date": obj.visit_date,
            "visit_slot": obj.visit_slot,
            "patient_id": obj.patient_id,
            "doctor_id": obj.doctor_id
        } for obj in Visit.objects.filter()]
        if data:
            return Response(data={"success": True, "data": data}, status=HTTP_200_OK)
        else:
            return Response(data={"success": False, "data": {
                "error_message": "No visits",
                "error_code": HTTP_400_BAD_REQUEST
            }}, status=HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_visit(request, id):
    data = [{
        "id": obj.id,
        "first_patient_name": obj.first_patient_name,
        "last_patient_name": obj.last_patient_name,
        "first_doctor_name": obj.first_doctor_name,
        "last_doctor_name": obj.last_doctor_name,
        "visit_date": obj.visit_date,
        "visit_slot": obj.visit_slot,
        "patient_id": obj.patient_id,
        "doctor_id": obj.doctor_id
    } for obj in Visit.objects.filter(id=id)]
    if data:
        return Response(data={"success": True, "data": data}, status=HTTP_200_OK)
    else:
        return Response(data={"success": False, "data": {
                "error_message": "There is no visit with such id",
                "error_code": HTTP_400_BAD_REQUEST
            }}, status=HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_doctor_visits(request, doctor_id):
    data = [{
        "id": obj.id,
        "first_patient_name": obj.first_patient_name,
        "last_patient_name": obj.last_patient_name,
        "visit_date": obj.visit_date,
        "visit_slot": obj.visit_slot,
        "patient_id": obj.patient_id,
    } for obj in Visit.objects.filter(doctor_id=doctor_id)]
    if data:
        return Response(data={"success": True, "data": data}, status=HTTP_200_OK)
    else:
        return Response(data={"success": False, "data": {
                "error_message": "There is no visits for this doctor",
                "error_code": HTTP_400_BAD_REQUEST
            }}, status=HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_free_slots(request, doctor_id, visit_date):
    data = [{
        "id": obj.id,
        "visit_date": obj.visit_date,
        "visit_slot": obj.visit_slot,
    } for obj in Visit.objects.filter(doctor_id=doctor_id, visit_date=visit_date)]

    appointments = [datetime.datetime.combine(dat["visit_date"], dat["visit_slot"]) for dat in data]
    new_appointments = [tuple((app, app + datetime.timedelta(minutes=60))) for app in appointments]
    visit_year, visit_month, visit_day = visit_date.split("-")
    hours = (datetime.datetime(int(visit_year), int(visit_month), int(visit_day), 8),
             datetime.datetime(int(visit_year), int(visit_month), int(visit_day), 16))

    print(f"Available slots for date {visit_date}: ")
    available_slots = get_slots(hours, new_appointments)

    if available_slots:
        return Response(data={"success": True, "data": {visit_date: available_slots}}, status=HTTP_200_OK)


@api_view(['GET'])
def get_patient_visits(request, patient_id):
    data = [{
        "id": obj.id,
        "first_doctor_name": obj.first_doctor_name,
        "last_doctor_name": obj.last_doctor_name,
        "visit_date": obj.visit_date,
        "visit_slot": obj.visit_slot,
        "doctor_id": obj.doctor_id,
    } for obj in Visit.objects.filter(patient_id=patient_id).order_by('visit_date')]
    if data:
        return Response(data={"success": True, "data": data}, status=HTTP_200_OK)
    else:
        return Response(data={"success": False, "data": {
                "error_message": "There is no visits for this patient",
                "error_code": HTTP_400_BAD_REQUEST
            }}, status=HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def delete_visit(request):
    # sample request: {"data": {"visit": {"visit_date": "2022-05-27", "visit_slot": "10:40:00"}}}
    print("request: ", request.data)
    visit_to_delete = Visit.objects.filter(visit_date=request.data['data']['visit']['visit_date'],
                                           visit_slot=request.data['data']['visit']['visit_slot'])
    if visit_to_delete:
        visit_to_delete.delete()
        return Response(data={"success": True, "data": ""}, status=HTTP_200_OK)
    return Response(data={"success": False, "data": {"error_message": "Bad request",
                                                     "error_code": HTTP_400_BAD_REQUEST}}, status=HTTP_400_BAD_REQUEST)
