from rest_framework import viewsets
from django.shortcuts import redirect, render
# * modelos
from .models import Obra, Tarea, Gasto, Galeria, Volumen
# * serializadores
from .serializers import ObraSerializer, TareaSerializer, GastoSerializer, GaleriaSerializer, VolumenSerializer
# * Decorators para la gestion del rol
from .decorators import es_administrador, es_consultor
# * Manejo de sesiones Usuario
from django.contrib.auth import login, logout
from .forms import RegistroForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
# Create your views here.


#! Pagina de inicio
def home(request):
    return render(request, 'home.html')


#! registro usuario
def registrar_usuario(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')  # pagina de inicio
    else:
        form = RegistroForm()
    return render(request, 'registro.html', {'form': form})

#! Login


def iniciar_sesion(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            # * se validan las credenciales del usuario
            user = form.get_user()
            login(request, user)
            return redirect('')  # pagina de obras
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

#! Logout


@login_required
def cerrar_sesion(request):
    logout(request)
    return redirect('home')  # pagina inicio


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
