from rest_framework import viewsets
# * modelos
from .models import Proveedor, Material, Banca
# * serializadores
from .serializers import ProveedorSerializer, MaterialSerializer, BancaSerializer
# Create your views here.


class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer


class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer


class BancaViewSet(viewsets.ModelViewSet):
    queryset = Banca.objects.all()
    serializer_class = BancaSerializer
