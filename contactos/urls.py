from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ProveedorViewSet, MaterialViewSet, BancaViewSet


router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet),
router.register(r'materiales', MaterialViewSet),
router.register(r'banca', BancaViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
