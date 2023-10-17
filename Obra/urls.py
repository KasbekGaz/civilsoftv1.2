from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UsuarioViewSet, Obra


router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'obras', Obra)


urlpatterns = [
    path('api/v1/', include(router.urls)),
]
