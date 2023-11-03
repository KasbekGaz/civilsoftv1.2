from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Usuario  # Importa tu modelo de usuario personalizado

#! Usuario registro


class RegistroForm(UserCreationForm):
    class Meta:
        model = Usuario  # * Asociamos el formulario con el modelo de usuario personalizado
        fields = ('email', 'username', 'password1', 'password2',
                  'first_name', 'last_name', 'rol')  # * campos requeridos
