from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ProveedorViewSet, MaterialViewSet


router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet),
router.register(r'materiales', MaterialViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
