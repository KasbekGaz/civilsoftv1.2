from rest_framework import viewsets, status
from rest_framework.response import Response
# * modelos
from .models import Proveedor, Material, Banca
# * serializadores
from .serializers import ProveedorSerializer, MaterialSerializer, BancaSerializer
# Create your views here.

#! Vista Proveedores


class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para registrar proveedores'}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar proveedores'}, status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar proveedores'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para eliminar proveedores'}, status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == 'Consul':
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para ver proveedores'}, status=status.HTTP_403_FORBIDDEN)

#! Vista Materiales


class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para registrar Materiales'}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar Materiales'}, status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar Materiales'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para eliminar Materiales'}, status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == 'Consul':
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para ver Materiales'}, status=status.HTTP_403_FORBIDDEN)

#! Vistas Banca de Proveedores


class BancaViewSet(viewsets.ModelViewSet):
    queryset = Banca.objects.all()
    serializer_class = BancaSerializer
    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para registrar Banca'}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar Banca'}, status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar Banca'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para eliminar Bancas'}, status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == 'Consul':
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para ver esta informacion'}, status=status.HTTP_403_FORBIDDEN)
