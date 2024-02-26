from rest_framework import viewsets, status
from rest_framework import generics, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

# * modelos
from .models import CustomUser, Obra, Tarea, Gasto, Galeria, Volumen, Abono

# * serializadores
from .serializers import (
    CustomUserSerializer,
    ObraSerializer,
    TareaSerializer,
    GastoSerializer,
    GaleriaSerializer,
    VolumenSerializer,
    AbonoSerializer
)

# Create your views here.

#! Vistas USUARIOS---------------------------------------------------------
# *Registrar Usuario


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "message": "Usuario registrado con éxito",
                "user_id": user.id,
                "token": token.key,
            },
            status=status.HTTP_201_CREATED,
        )


# * Login


class UserLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)

        if created:
            message = "Inicio de sesión exitoso."
        else:
            message = "Sesión ya iniciada para este usuario."

        return Response(
            {"token": token.key, "message": message}, status=status.HTTP_200_OK
        )


# * Logout
class UserLogoutView(generics.DestroyAPIView):
    queryset = Token.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        user = request.user
        tokens = Token.objects.filter(user=user)
        tokens.delete()
        return Response(
            {"message": "Cierre de sesión exitoso"}, status=status.HTTP_204_NO_CONTENT
        )


# ! Vista de OBRA --------------------------------------------------------------------
class ObraViewSet(viewsets.ModelViewSet):
    queryset = Obra.objects.all()
    serializer_class = ObraSerializer

    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ["get", "post", "put", "patch", "delete"]

    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            response = super().create(request, *args, **kwargs)
            response.data["message"] = "La obra se ha creado exitosamente."
            return response
        elif request.user.is_authenticated and request.user.rol == "Consul":
            print(f"Usuario no autorizado: {request.user}")
            return Response(
                {"detail": "No tiene permiso para crear obras"},
                status=status.HTTP_403_FORBIDDEN,
            )
        else:
            print(f"Usuario no autorizado: {request.user}")
            return Response(
                {"detail": "No tiene permiso para crear obras"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar obras"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar obras"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para eliminar un gasto (para usuarios Admin)
            response = super().destroy(request, *args, **kwargs)

            return Response(
                {"message": "La obra se ha eliminado exitosamente."},
                status=status.HTTP_204_NO_CONTENT,
            )
        else:
            return Response(
                {"detail": "No tiene permiso para eliminar obras"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == "Consul":
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            print(f"Usuario no autorizado: {request.user}")
            return Response(
                {"detail": "No tiene permiso para ver obras"},
                status=status.HTTP_403_FORBIDDEN,
            )


# ! Vista Tarea ---------------------------------------------------------------
class TareaVista(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ["get", "post", "put", "patch", "delete"]

    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para crear Tareas"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar Tareas"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar Tareas"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para eliminar Tareas"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == "Consul":
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para ver Tareas"},
                status=status.HTTP_403_FORBIDDEN,
            )


# ? VISTAS DE TAREA PARA CRUD BAJO ID OBRA ASOCIADA
class ListarTareabyObra(generics.ListAPIView):  # * Listar Tareas por Obra_id
    serializer_class = TareaSerializer

    def get_queryset(self):
        obra_id = self.kwargs["obra_id"]
        return Tarea.objects.filter(obra_id=obra_id)

    def list(self, request, *args, **kwargs):
        obra_id = self.kwargs["obra_id"]

        if request.user.is_authenticated and request.user.rol in ["Admin", "Consul"]:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "No tiene permisos para ver estos datos"},
                status=status.HTTP_403_FORBIDDEN,
            )


class CreateTareabyObra(generics.CreateAPIView):  # * Crear tareas por Obra_id
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

    def perform_create(self, serializer):
        # Asignamos la obra ants de guardar la tarea
        obra_id = self.kwargs.get("obra_id")
        serializer.save(obra_id=obra_id)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para crear Tareas"},
                status=status.HTTP_403_FORBIDDEN,
            )


class UpdateTareabyObra(generics.UpdateAPIView):  # * Actualizar tarea por Obra_id
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

    def perform_update(self, serializer):
        obra_id = self.kwargs.get("obra_id")
        serializer.save(obra_id=obra_id)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para actualizar Tareas"},
                status=status.HTTP_403_FORBIDDEN,
            )


class DeleteTareabyObra(generics.DestroyAPIView):  # * Eliminar tarea por Obra_id
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

    def delete(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().delete(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para eliminar Tareas"},
                status=status.HTTP_403_FORBIDDEN,
            )


# ! vistas GASTO---------------------------------------------------------------------
class GastoViewSet(viewsets.ModelViewSet):
    queryset = Gasto.objects.all()
    serializer_class = GastoSerializer
    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ["get", "post", "put", "patch", "delete"]

    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para crear gastos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar gastos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar gastos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para eliminar gastos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == "Consul":
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para ver gastos"},
                status=status.HTTP_403_FORBIDDEN,
            )


# ? VISTAS DE GASTOS PARA CRUD BAJO ID OBRA ASOCIADA
class ListarGastobyObra(generics.ListAPIView):  # * Listar Gasto por Obra_id
    serializer_class = GastoSerializer

    def get_queryset(self):
        obra_id = self.kwargs["obra_id"]
        return Gasto.objects.filter(obra_id=obra_id)

    def list(self, request, *args, **kwargs):
        obra_id = self.kwargs["obra_id"]

        if request.user.is_authenticated and request.user.rol in ["Admin", "Consul"]:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "No tiene permisos para ver estos datos"},
                status=status.HTTP_403_FORBIDDEN,
            )


class CreateGastobyObra(generics.CreateAPIView):  # * Crear Gastos por Obra_id
    queryset = Gasto.objects.all()
    serializer_class = GastoSerializer

    def perform_create(self, serializer):
        # Asignamos la obra ants de guardar la tarea
        obra_id = self.kwargs.get("obra_id")
        serializer.save(obra_id=obra_id)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para crear Gastos"},
                status=status.HTTP_403_FORBIDDEN,
            )


class UpdateGastobyObra(generics.UpdateAPIView):  # * Actualizar Gasto por Obra_id
    queryset = Gasto.objects.all()
    serializer_class = GastoSerializer

    def perform_update(self, serializer):
        obra_id = self.kwargs.get("obra_id")
        serializer.save(obra_id=obra_id)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para actualizar Gastos"},
                status=status.HTTP_403_FORBIDDEN,
            )


class DeleteGastobyObra(generics.DestroyAPIView):  # * Eliminar tarea por Obra_id
    queryset = Gasto.objects.all()
    serializer_class = GastoSerializer

    def delete(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().delete(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para eliminar Gastos"},
                status=status.HTTP_403_FORBIDDEN,
            )


#! Vista Galeria -----------------------------------------------------------
class GaleriaViewSet(viewsets.ModelViewSet):
    queryset = Galeria.objects.all()
    serializer_class = GaleriaSerializer
    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ["get", "post", "put", "patch", "delete"]
    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para subir archivos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar archivos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar archivos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para eliminar archivos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == "Consul":
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para ver archivos"},
                status=status.HTTP_403_FORBIDDEN,
            )
# ? VISTAS DE GASTOS PARA CRUD BAJO ID OBRA ASOCIADA


class ListarGaleriaporObra(generics.ListAPIView):  # * Listar Galeria por Obra_id
    serializer_class = GaleriaSerializer

    def get_queryset(self):
        obra_id = self.kwargs["obra_id"]
        return Galeria.objects.filter(obra_id=obra_id)

    def list(self, request, *args, **kwargs):
        obra_id = self.kwargs["obra_id"]

        if request.user.is_authenticated and request.user.rol in ["Admin", "Consul"]:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "No tiene permisos para ver estos datos."},
                status=status.HTTP_403_FORBIDDEN
            )


class CreateGaleriabyObra(generics.CreateAPIView):  # * Crear galeria por Obra_id
    queryset = Galeria.objects.all()
    serializer_class = GaleriaSerializer

    def perform_create(self, serializer):
        obra_id = self.kwargs.get("obra_id")
        serializer.save(obra_id=obra_id)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"details": "No tienes permisos para guardar imagenes."}, status=status.HTTP_403_FORBIDDEN
            )


# * Actualizar Galeria por Obra_id
class UpdateGaleriabyObra(generics.UpdateAPIView):
    queryset = Galeria.objects.all()
    serializer_class = GaleriaSerializer

    def perform_update(self, serializer):
        obra_id = self.kwargs.get("obra_id")
        serializer.save(obra_id=obra_id)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tienen permisos de actualizar esta Galeria"}, status=status.HTTP_403_FORBIDDEN
            )


# * Eliminar Galeria pod Obra_id
class DeleteGaleriabyObra(generics.DestroyAPIView):
    queryset = Galeria.objects.all()
    serializer_class = GaleriaSerializer

    def delete(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().delete(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para eliminar la Galeria"}, status=status.HTTP_403_FORBIDDEN
            )

#! Vista Volumen-------------------------------


class VolumenViewSet(viewsets.ModelViewSet):
    queryset = Volumen.objects.all()
    serializer_class = VolumenSerializer
    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ["get", "post", "put", "patch", "delete"]
    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para crear volumenes"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar volumenes"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar volumenes"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para eliminar volumenes"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == "Consul":
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para ver volumenes"},
                status=status.HTTP_403_FORBIDDEN,
            )

# ? VISTA DE VOLUMEN PARA CRUD BAJO ID OBRA ASOCIADA


class ListarVolumenPorObra(generics.ListAPIView):  # *Listar Volumen por Obra_id
    serializer_class = VolumenSerializer

    def get_queryset(self):
        obra_id = self.kwargs["obra_id"]
        return Volumen.objects.filter(obra_id=obra_id)

    def list(self, request, *args, **kwargs):
        obra_id = self.kwargs["obra_id"]

        if request.user.is_authenticated and request.user.rol in ["Admin", "Consul"]:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "No tiene permisos para ver estos datos"},
                status=status.HTTP_403_FORBIDDEN
            )


# * Crear un volumen por Obra_id
class CreateVolumenbyObra(generics.CreateAPIView):
    queryset = Volumen.objects.all()
    serializer_class = VolumenSerializer

    def perform_create(self, serializer):
        obra_id = self.kwargs.get("obra_id")
        serializer.save(obra_id=obra_id)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"details": "No tienes permisos para crear volumenes."}, status=status.HTTP_403_FORBIDDEN
            )

# * Atualizar Volumen por Obra_Id


class UpdateVolumenbyObra(generics.UpdateAPIView):
    queryset = Volumen.objects.all()
    serializer_class = VolumenSerializer

    def perform_update(self, serializer):
        obra_id = self.kwargs.get("obra_id")
        serializer.save(obra_id=obra_id)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tienen permisos de actualizar volumenes"}, status=status.HTTP_403_FORBIDDEN
            )

# * Eliminar Volumen por Obra_Id


class DeleteVolumenbyObra(generics.DestroyAPIView):
    queryset = Volumen.objects.all()
    serializer_class = VolumenSerializer

    def delete(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().delete(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para eliminar este Volumen"}, status=status.HTTP_403_FORBIDDEN
            )


class AbonoViewSet(viewsets.ModelViewSet):
    queryset = Abono.objects.all()
    serializer_class = AbonoSerializer
    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ["get", "post", "put", "patch", "delete"]

    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para crear abonos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar abonos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para actualizar abonos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para eliminar abonos"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == "Consul":
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permiso para ver abonos"},
                status=status.HTTP_403_FORBIDDEN,
            )

# ? Peticiones de ABONO


class ListarAbonoPorObra(generics.ListAPIView):  # *Listar Abono por Obra_id
    serializer_class = AbonoSerializer

    def get_queryset(self):
        obra_id = self.kwargs["obra_id"]
        return Abono.objects.filter(obra_id=obra_id)

    def list(self, request, *args, **kwargs):
        obra_id = self.kwargs["obra_id"]

        if request.user.is_authenticated and request.user.rol in ["Admin", "Consul"]:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "No tiene permisos para ver estos datos"},
                status=status.HTTP_403_FORBIDDEN
            )

# * Crear un Abono por Obra_id


class CreateAbonobyObra(generics.CreateAPIView):
    queryset = Abono.objects.all()
    serializer_class = AbonoSerializer

    def perform_create(self, serializer):
        obra_id = self.kwargs.get("obra_id")
        serializer.save(obra_id=obra_id)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().create(request, *args, **kwargs)
        else:
            return Response(
                {"details": "No tienes permisos para crear ABONOS."}, status=status.HTTP_403_FORBIDDEN
            )

# * Atualizar Volumen por Obra_Id


class UpdateAbonoyObra(generics.UpdateAPIView):
    queryset = Abono.objects.all()
    serializer_class = AbonoSerializer

    def perform_update(self, serializer):
        obra_id = self.kwargs.get("obra_id")
        serializer.save(obra_id=obra_id)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().update(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tienen permisos de actualizar Abonos"}, status=status.HTTP_403_FORBIDDEN
            )

# * Eliminar Volumen por Obra_Id


class DeleteAbonobyObra(generics.DestroyAPIView):
    queryset = Abono.objects.all()
    serializer_class = AbonoSerializer

    def delete(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == "Admin":
            return super().delete(request, *args, **kwargs)
        else:
            return Response(
                {"detail": "No tiene permisos para eliminar este Abonos"}, status=status.HTTP_403_FORBIDDEN
            )
