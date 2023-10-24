from rest_framework import serializers
from .models import Proveedor, Material, Banca


class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'


class MaterialSerializer(serializers.ModelSerializer):
    proveedor_nombre_comercial = serializers.CharField(
        source='proveedor.nombre_comercial', read_only=True)

    class Meta:
        model = Material
        fields = '__all__'


class BancaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banca
        fields = '__all__'
