from rest_framework import viewsets, status
from rest_framework import generics
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
# ? Vistas de Material para CRUD por Proveedor_id
# * Listar Materiales por Proovedor_id


class ListarMaterialesbyP(generics.ListAPIView):
    serializer_class = MaterialSerializer

    def get_queryset(self):
        proveedor_id = self.kwargs["proveedor_id"]
        return Material.objects.filter(proveedor_id=proveedor_id)

    def list(self, request, *args, **kwargs):
        proveedor_id = self.kwargs["proveedor_id"]

        if request.user.is_authenticated and request.user.rol in ["Admin", "Consul"]:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "No tiene permisos para ver estos datos"}, status=status.HTTP_403_FORBIDDEN
            )

# * Crear Material segun la id del proveedor


class CreateMaterialbyP(generics.CreateAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

    def perform_create(self, serializer):

        proveedor_id = self.kwargs.get("proveedor_id")
        serializer.save(proveedor_id=proveedor_id)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para agregar Materiales"},
                status=status.HTTP_403_FORBIDDEN,
            )

# *  Actualizar un Material por id del proveedor


class UpdateMaterialbyP(generics.UpdateAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

    def perform_update(self, serializer):
        proveedor_id = self.kwargs.get("proveedor_id")
        serializer.save(proveedor_id=proveedor_id)

    def update(self, request, * args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para actualizar Materiales"},
                status=status.HTTP_403_FORBIDDEN
            )
# *  Eliminar Material asociado a un proveedor


class DeleteMaterialbyP(generics.DestroyAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

    def delete(self, request, * args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().delete(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para Eliminar Materiales"}, status=status.HTTP_403_FORBIDDEN
            )

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
# ? VISTAS de Banca para CRUD bajo id de proveedor
# * Aqui se listan las bancas de un proveedor


class ListarBancabyP(generics.ListAPIView):
    serializer_class = BancaSerializer

    def get_queryset(self):
        proveedor_id = self.kwargs["proveedor_id"]
        return Banca.objects.filter(proveedor_id=proveedor_id)

    def list(self, request, *args, **kwargs):
        proveedor_id = self.kwargs["proveedor_id"]

        if request.user.is_authenticated and request.user.rol in ["Admin", "Consul"]:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "No tiene permisos para ver estos datos"}, status=status.HTTP_403_FORBIDDEN
            )
# * Crear una banca segun la id de un proveedor


class CreateBancabyP(generics.CreateAPIView):
    queryset = Banca.objects.all()
    serializer_class = BancaSerializer

    def perform_create(self, serializer):

        proveedor_id = self.kwargs.get("proveedor_id")
        serializer.save(proveedor_id=proveedor_id)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para agregar informacion bancaria"},
                status=status.HTTP_403_FORBIDDEN,
            )
# * Actualizar info de banca de un proveedor


class UpdateBancabyP(generics.UpdateAPIView):
    queryset = Banca.objects.all()
    serializer_class = BancaSerializer

    def perform_update(self, serializer):
        proveedor_id = self.kwargs.get("proveedor_id")
        serializer.save(proveedor_id=proveedor_id)

    def update(self, request, * args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para actualizar informacion bancaria"},
                status=status.HTTP_403_FORBIDDEN
            )
# * Eliminar info de banca de un proveedor


class DeleteBancabyP(generics.DestroyAPIView):
    queryset = Banca.objects.all()
    serializer_class = BancaSerializer

    def delete(self, request, * args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().delete(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para eliminar informaccion bancaria"}, status=status.HTTP_403_FORBIDDEN
            )
