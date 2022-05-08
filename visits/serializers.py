from rest_framework import serializers
from rest_framework.authtoken.admin import User

from .models import *


class VisitSerializer(serializers.ModelSerializer):
    first_patient_name = serializers.CharField(max_length=100, default="First patient's name")
    last_patient_name = serializers.CharField(max_length=100, default="Last patient's name")
    first_doctor_name = serializers.CharField(max_length=100, default="First doctor's name")
    last_doctor_name = serializers.CharField(max_length=100, default="Last doctor's name")
    visit_date = serializers.DateField()
    visit_slot = serializers.TimeField()
    patient_id = serializers.HiddenField(default=0)
    doctor_id = serializers.HiddenField(default=0)

    class Meta:
        model = Visit
        fields = [
            'first_patient_name',
            'last_patient_name',
            'first_doctor_name',
            'last_doctor_name',
            'visit_date',
            'visit_slot',
            'patient_id',
            'doctor_id'
        ]

    def create(self, validated_data):
        first_patient_name = validated_data['first_patient_name']
        last_patient_name = validated_data['last_patient_name']
        first_doctor_name = validated_data['first_doctor_name']
        last_doctor_name = validated_data['last_doctor_name']
        visit_date = validated_data['visit_date']
        visit_slot = validated_data['visit_slot']
        patient_id = User.objects.filter(first_name=first_patient_name, last_name=last_patient_name, is_staff=False).first().id
        print("patient_id", patient_id)
        doctor_id = User.objects.filter(first_name=first_doctor_name, last_name=last_doctor_name, is_staff=True).first().id
        print("doctor_id", doctor_id)

        visit_obj = Visit(
            first_patient_name=first_patient_name,
            last_patient_name=last_patient_name,
            first_doctor_name=first_doctor_name,
            last_doctor_name=last_doctor_name,
            patient_id=patient_id,
            doctor_id=doctor_id,
            visit_date=visit_date,
            visit_slot=visit_slot,

        )
        visit_obj.save()
        return validated_data

    # def validate(self, data):
    #     first_patient_name = data.get("first_patient_name", None)
    #     last_patient_name = data.get("last_patient_name", None)
    #     first_doctor_name = data.get("first_doctor_name", None)
    #     last_doctor_name = data.get("last_doctor_name", None)
    #     visit_date = data.get("visit_date", None)
    #     visit_time = data.get("visit_time", None)
    #
    #     if not first_patient_name or not last_patient_name or not first_doctor_name\
    #             or not first_doctor_name or not last_doctor_name or not visit_date or not visit_time:
    #         raise serializers.ValidationError("All fields are required to create visit.")
    #
    #     # check if visit exists
    #     visit = Visit.objects.filter(visit_date=visit_date, visit_time=visit_time, last_doctor_name=last_doctor_name)
    #     if visit.exists() and visit.count() == 1:
    #         visit_obj = visit.first()
    #     else:
    #         raise serializers.ValidationError("This appointment is already booked")
    #
    #     return data
