from rest_framework import serializers
from .models import Usuario, Obra


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        # este es para traer todos los campos
        fields = '__all__'


class ObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obra
        fields = '__all__'
