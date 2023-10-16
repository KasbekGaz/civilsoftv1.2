from django.shortcuts import render
from rest_framework import viewsets
# * modelos
from .models import Usuario
# * serializadores
from .serializers import UsuarioSerializer
# Create your views here.


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
