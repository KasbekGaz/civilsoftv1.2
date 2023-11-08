from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ObraViewSet, TareaVista, GastoViewSet, GaleriaViewSet, VolumenViewSet
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
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
