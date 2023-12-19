from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    ObraViewSet,
    TareaVista,
    GastoViewSet,
    GaleriaViewSet,
    VolumenViewSet,
    # * Llamadas TAREAS
    ListarTareabyObra,
    CreateTareabyObra,
    UpdateTareabyObra,
    DeleteTareabyObra,
    # * Llamadas CRUD GASTOS
    ListarGastobyObra,
    CreateGastobyObra,
    UpdateGastobyObra,
    DeleteGastobyObra
)

from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'obras', ObraViewSet)
router.register(r'tareas', TareaVista)
router.register(r'gastos', GastoViewSet, basename='gasto')
router.register(r'galeria', GaleriaViewSet, basename='galeria'),
router.register(r'volumen', VolumenViewSet, basename='comparativa_volumen')


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

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
