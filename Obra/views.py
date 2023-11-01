from rest_framework import viewsets
from django.shortcuts import redirect, render
# * Arriba cosas para la vista personalizada
# * modelos
from .models import Obra, Tarea, Gasto, Galeria, Volumen
# * serializadores
from .serializers import ObraSerializer, TareaSerializer, GastoSerializer, GaleriaSerializer, VolumenSerializer
# * Decorators para la gestion del rol
from .decorators import es_administrador, es_consultor
# * Manejo de sesiones Usuario
from django.contrib.auth import login, logout
from .forms import RegistroForm
# Create your views here.


def registrar_usuario(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = RegistroForm()
    return render(request, 'registro.html', {'form': form})


''' El serializador del modelo usuario anterior

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
'''


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
