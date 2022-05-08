from datetime import datetime

from django.db import models

# Create your models here.


class Visit(models.Model):
    first_patient_name = models.TextField(max_length=25, default="First patient's name")
    last_patient_name = models.TextField(max_length=30, default="Last patient's name")
    first_doctor_name = models.TextField(max_length=25, default="First doctor's name")
    last_doctor_name = models.TextField(max_length=30, default="Last doctor's name")
    visit_date = models.DateField(default=None)
    visit_slot = models.TimeField(default=None)
    patient_id = models.IntegerField(default=0)
    doctor_id = models.IntegerField(default=0)
