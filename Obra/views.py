from rest_framework import viewsets
# * modelos
from .models import Usuario, Obra, Tarea
# * serializadores
from .serializers import UsuarioSerializer, ObraSerializer, TareaSerializer
# Create your views here.


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class ObraViewSet(viewsets.ModelViewSet):
    # queryset = Obra.objects.all()
    serializer_class = ObraSerializer

    def get_queryset(self):
        # * aqui se obtiene el usuario que realiza la solicitud
        usuario = self.request.user
        # * Muestra todas las obras a Administradores
        if usuario.rol == 'Administrador':
            return Obra.objects.all()
        # * Muestra solo las obras asociadas al consultor
        elif usuario.rol == 'Consultor':
            return usuario.obras.all()


class TareaVista(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
