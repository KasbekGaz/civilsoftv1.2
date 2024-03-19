from rest_framework import serializers
from .models import CustomUser, Obra, Tarea, Gasto, Galeria, Volumen, Abono


class CustomUserSerializer(serializers.ModelSerializer):
    rol = serializers.ChoiceField(choices=CustomUser.ROL_CHOICES)

    class Meta:
        model = CustomUser
        # este es para traer todos los campos
        fields = ('id', 'username', 'email', 'telefono', 'password', 'rol')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            telefono=validated_data.get('telefono'),
            rol=validated_data['rol']
        )
        return user


class ObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obra
        fields = '__all__'


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = '__all__'


class GastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gasto
        fields = '__all__'


class GaleriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Galeria
        fields = ['obra', 'descripcion', 'fecha', 'archivo']


class VolumenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volumen
        fields = '__all__'


class AbonoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abono
        fields = '__all__'
