from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer
from rest_framework.authtoken.models import Token


class UserCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(label="Email Address")
    email2 = serializers.EmailField(label="Confirm Email")

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'email2',
            'password',
        ]
        extra_kwargs = {
            "password": {
                "write_only": True, "required": True
            }
        }

    def validate_email(self, value):
        data = self.get_initial()
        email = data.get("email2")
        email2 = value
        if email != email2:
            raise ValidationError("Emails must match.")
        user_qs = User.objects.filter(email=email2)
        if user_qs.exists():
            raise ValidationError("This user has already registered.")
        return value

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
            username=username,
            email=email,
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data


class UserLoginSerializer(ModelSerializer):
    token = serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.CharField(allow_blank=True, required=False)
    email = serializers.EmailField(label="Email Address", allow_blank=True, required=False)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'token',
        ]
        extra_kwargs = {
            "password": {
                "write_only": True, "required": True
            }
        }

    def validate(self, data):
        email = data.get("email", None)
        username = data.get("username", None)
        password = data['password']
        if not email and not username:
            raise serializers.ValidationError("A username or email is required to login.")

        # check if user exists
        user = User.objects.filter(email=email, username=username)
        user = user.exclude(email__isnull=True).exclude(email__iexact='')
        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise serializers.ValidationError("This username/email is not valid")

        if user:
            if not user_obj.check_password(password):
                raise serializers.ValidationError("Incorrect credentials, please try again.")

        data["token"] = Token.objects.create(user=user_obj)

        return data
