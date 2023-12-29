from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    ProveedorViewSet,
    MaterialViewSet,
    BancaViewSet,
    # * Llamadas CRUD Materiales
    ListarMaterialesbyP,
    CreateMaterialbyP,
    UpdateMaterialbyP,
    DeleteMaterialbyP,
    # * Llamadas CRUD Banca
    ListarBancabyP,
    CreateBancabyP,
    UpdateBancabyP,
    DeleteBancabyP,

)


router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet),
router.register(r'materiales', MaterialViewSet),
router.register(r'banca', BancaViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    # * CRUD Materiales by Proveedores_id -----------------------
    path('api/v1/materiales-by-proveedor/<int:proveedor_id>/',
         ListarMaterialesbyP.as_view()),
    path('api/v1/create-material-for-proveedor/<int:proveedor_id>/',
         CreateMaterialbyP.as_view()),
    path('api/v1/update-material-for-proveedor/<int:proveedor_id>/<int:pk>/',
         UpdateMaterialbyP.as_view()),
    path('api/v1/delete-material-for-proveedor/<int:proveedor_id>/<int:pk>/',
         DeleteMaterialbyP.as_view()),
    # * CRUD Banca by Proveedores_id ----------------------------
    path('api/v1/banca-by-proveedor/<int:proveedor_id>/', ListarBancabyP.as_view()),
    path('api/v1/create-banca-for-proveedor/<int:proveedor_id>/',
         CreateBancabyP.as_view()),
    path('api/v1/update-banca-for-proveedor/<int:proveedor_id>/<int:pk>/',
         UpdateBancabyP.as_view()),
    path('api/v1/delete-banca-for-proveedor/<int:proveedor_id>/<int:pk>/',
         DeleteBancabyP.as_view()),
]
