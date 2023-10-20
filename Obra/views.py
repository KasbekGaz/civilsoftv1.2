from rest_framework import viewsets
# * modelos
from .models import Usuario, Obra, Tarea, Gasto, Galeria, Volumen
# * serializadores
from .serializers import UsuarioSerializer, ObraSerializer, TareaSerializer, GastoSerializer, GaleriaSerializer, VolumenSerializer


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


class VolumenViewSet(viewsets.ModelViewSet):
    queryset = Volumen.objects.all()
    serializer_class = VolumenSerializer
