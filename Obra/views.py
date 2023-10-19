from rest_framework import viewsets
# * modelos
from .models import Usuario, Obra, Tarea, Gasto, Galeria
# * serializadores
from .serializers import UsuarioSerializer, ObraSerializer, TareaSerializer, GastoSerializer, GaleriaSerializer
# * Otras importaciones necesarias
from django.db import models

# Create your views here.


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class ObraViewSet(viewsets.ModelViewSet):
    queryset = Obra.objects.all()
    serializer_class = ObraSerializer


class TareaVista(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer


class GastoViewSet(viewsets.ModelViewSet):
    queryset = Gasto.objects.all()
    serializer_class = GastoSerializer


class GaleriaViewSet(viewsets.ModelViewSet):
    queryset = Galeria.objects.all()
    serializer_class = GaleriaSerializer
