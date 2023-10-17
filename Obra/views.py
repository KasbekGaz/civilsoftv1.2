from rest_framework import viewsets
# * modelos
from .models import Usuario, Obra
# * serializadores
from .serializers import UsuarioSerializer, ObraSerializer
# Create your views here.


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class Obra(viewsets.ModelViewSet):
    queryset = Obra.objects.all()
    serializer_class = ObraSerializer
