from rest_framework import serializers
from .models import Usuario, Obra, Tarea, Gasto, Galeria


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        # este es para traer todos los campos
        fields = '__all__'


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
        fields = '__all__'
