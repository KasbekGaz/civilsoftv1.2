from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    ObraViewSet,
    TareaVista,
    GastoViewSet,
    GaleriaViewSet,
    VolumenViewSet,
    AbonoViewSet,
    # * Llamadas TAREAS
    ListarTareabyObra,
    CreateTareabyObra,
    UpdateTareabyObra,
    DeleteTareabyObra,
    # * Llamadas CRUD GASTOS
    ListarGastobyObra,
    CreateGastobyObra,
    UpdateGastobyObra,
    DeleteGastobyObra,
    # * Llamadas CRUD Galeria
    ListarGaleriaporObra,
    CreateGaleriabyObra,
    UpdateGaleriabyObra,
    DeleteGaleriabyObra,
    # * Llamadas CRUD Volumen
    ListarVolumenPorObra,
    CreateVolumenbyObra,
    UpdateVolumenbyObra,
    DeleteVolumenbyObra,
    # * Llamadas CRUD Abono
    ListarAbonoPorObra,
    CreateAbonobyObra,
    UpdateAbonoyObra,
    DeleteAbonobyObra,
    # * EXCEL export
    generar_excel_gastos_obra,


)

from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'obras', ObraViewSet)
router.register(r'tareas', TareaVista)
router.register(r'gastos', GastoViewSet, basename='gasto')
router.register(r'galeria', GaleriaViewSet, basename='galeria'),
router.register(r'volumen', VolumenViewSet, basename='comparativa_volumen')
router.register(r'abono', AbonoViewSet)


urlpatterns = [
    path('api/v1/', include(router.urls)),
    # * Tareas CRUD por Id Obra----------------------------------------------------------
    path('api/v1/tareasbyObra/<int:obra_id>/', ListarTareabyObra.as_view()),
    path('api/v1/create-tarea-for-obra/<int:obra_id>/',
         CreateTareabyObra.as_view()),
    path('api/v1/update-tarea-for-obra/<int:obra_id>/<int:pk>/',
         UpdateTareabyObra.as_view()),
    path('api/v1/delete-tarea-for-obra/<int:obra_id>/<int:pk>/',
         DeleteTareabyObra.as_view()),
    # *Gastos CRUD por id obra----------------------------------------------------------
    path('api/v1/gastosbyObra/<int:obra_id>/', ListarGastobyObra.as_view()),
    path('api/v1/create-gasto-for-obra/<int:obra_id>/',
         CreateGastobyObra.as_view()),
    path('api/v1/update-gasto-for-obra/<int:obra_id>/<int:pk>/',
         UpdateGastobyObra.as_view()),
    path('api/v1/delete-gasto-for-obra/<int:obra_id>/<int:pk>/',
         DeleteGastobyObra.as_view()),
    # * GALERIA CRUD por id obra ---------------------------------------
    path('api/v1/galeriabyObra/<int:obra_id>/',
         ListarGaleriaporObra.as_view()),
    path('api/v1/create-galeria-for-obra/<int:obra_id>/',
         CreateGaleriabyObra.as_view()),
    path('api/v1/update-galeria-for-obra/<int:obra_id>/<int:pk>/',
         UpdateGaleriabyObra.as_view()),
    path('api/v1/delete-galeria-for-obra/<int:obra_id>/<int:pk>/',
         DeleteGaleriabyObra.as_view()),
    # * VOLUMEN CRUD por id obra ---------------------------------------
    path('api/v1/volumenbyObra/<int:obra_id>/',
         ListarVolumenPorObra.as_view()),
    path('api/v1/create-volumen-for-obra/<int:obra_id>/',
         CreateVolumenbyObra.as_view()),
    path('api/v1/update-volumen-for-obra/<int:obra_id>/<int:pk>/',
         UpdateVolumenbyObra.as_view()),
    path('api/v1/delete-volumen-for-obra/<int:obra_id>/<int:pk>/',
         DeleteVolumenbyObra.as_view()),
    # * ABONO CRUD por di obra ----------------------------------------
    path('api/v1/abonobyObra/<int:obra_id>/',
         ListarAbonoPorObra.as_view()),
    path('api/v1/create-abono-for-obra/<int:obra_id>/',
         CreateAbonobyObra.as_view()),
    path('api/v1/update-abono-for-obra/<int:obra_id>/<int:pk>/',
         UpdateAbonoyObra.as_view()),
    path('api/v1/delete-abono-for-obra/<int:obra_id>/<int:pk>/',
         DeleteAbonobyObra.as_view()),
    # * Rutas para generar EXCELS
    path('api/v1/generar_excel_gastos/<int:obra_id>', generar_excel_gastos_obra),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
