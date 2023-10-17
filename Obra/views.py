from rest_framework import viewsets
# * modelos
from .models import Usuario, Obra, Tarea
# * serializadores
from .serializers import UsuarioSerializer, ObraSerializer, TareaSerializer
# Create your views here.


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class Obra(viewsets.ModelViewSet):
    queryset = Obra.objects.all()
    serializer_class = ObraSerializer


class TareaVista(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
