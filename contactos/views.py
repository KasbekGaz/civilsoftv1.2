from rest_framework import viewsets
# * modelos
from .models import Proveedor, Material
# * serializadores
from .serializers import ProveedorSerializer, MaterialSerializer
# Create your views here.


class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer


class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
