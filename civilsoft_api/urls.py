"""
URL configuration for civilsoft_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# * rutas de obra app
from Obra import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('Obra.urls')),
    path('contacs/', include('contactos.urls')),
    # *Rutas de incio:
    path("", views.home, name="home"),
    path("registro/", views.registrar_usuario, name="registro"),
    path("login/", views.iniciar_sesion, name="login"),
    path("logout/", views.cerrar_sesion, name="logout"),
]
