from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UsuarioViewSet, ObraViewSet, TareaVista, GastoViewSet


router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'obras', ObraViewSet)
router.register(r'tareas', TareaVista)
router.register(r'gastos', GastoViewSet, basename='gasto')


urlpatterns = [
    path('api/v1/', include(router.urls)),
]
