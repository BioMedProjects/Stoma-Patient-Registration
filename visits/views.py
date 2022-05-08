from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from .models import Visit
from .serializers import VisitSerializer

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
