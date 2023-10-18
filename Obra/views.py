from rest_framework import viewsets
# * modelos
from .models import Usuario, Obra, Tarea, Gasto
# * serializadores
from .serializers import UsuarioSerializer, ObraSerializer, TareaSerializer, GastoSerializer
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
