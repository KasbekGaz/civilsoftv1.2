from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UsuarioViewSet


# * aqui va tu codigo:

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

# * aqui van las rutas

urlpatterns = [
    path('', include(router.urls)),
]
