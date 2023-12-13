from rest_framework import viewsets, status
from rest_framework import generics, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
# * modelos
from .models import CustomUser, Obra, Tarea, Gasto, Galeria, Volumen
# * serializadores
from .serializers import CustomUserSerializer, ObraSerializer, TareaSerializer, GastoSerializer, GaleriaSerializer, VolumenSerializer

# Create your views here.

#! Vistas USUARIOS
# *Registrar Usuario


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'message': 'Usuario registrado con éxito', 'user_id': user.id, 'token': token.key}, status=status.HTTP_201_CREATED)

# * Login


class UserLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        if created:
            message = "Inicio de sesión exitoso."
        else:
            message = "Sesión ya iniciada para este usuario."

        return Response({'token': token.key, 'message': message}, status=status.HTTP_200_OK)


# * Logout
class UserLogoutView(generics.DestroyAPIView):
    queryset = Token.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        user = request.user
        tokens = Token.objects.filter(user=user)
        tokens.delete()
        return Response({'message': 'Cierre de sesión exitoso'}, status=status.HTTP_204_NO_CONTENT)


#! Vista de OBRA

class ObraViewSet(viewsets.ModelViewSet):
    queryset = Obra.objects.all()
    serializer_class = ObraSerializer

    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            response = super().create(request, *args, **kwargs)
            response.data['message'] = 'La obra se ha creado exitosamente.'
            return response
        elif request.user.is_authenticated and request.user.rol == 'Consul':
            print(f'Usuario no autorizado: {request.user}')
            return Response({'detail': 'No tiene permiso para crear obras'}, status=status.HTTP_403_FORBIDDEN)
        else:
            print(f'Usuario no autorizado: {request.user}')
            return Response({'detail': 'No tiene permiso para crear obras'}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar obras'}, status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar obras'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para eliminar un gasto (para usuarios Admin)
            response = super().destroy(request, *args, **kwargs)

            return Response({'message': 'La obra se ha eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'detail': 'No tiene permiso para eliminar obras'}, status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == 'Consul':
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            print(f'Usuario no autorizado: {request.user}')
            return Response({'detail': 'No tiene permiso para ver obras'}, status=status.HTTP_403_FORBIDDEN)

#! Vista Tarea


class TareaVista(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para crear Tareas'}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar Tareas'}, status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar Tareas'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para eliminar Tareas'}, status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == 'Consul':
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para ver Tareas'}, status=status.HTTP_403_FORBIDDEN)

#! vistas GASTO


class GastoViewSet(viewsets.ModelViewSet):
    queryset = Gasto.objects.all()
    serializer_class = GastoSerializer
    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para crear gastos'}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar gastos'}, status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar gastos'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para eliminar gastos'}, status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == 'Consul':
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para ver gastos'}, status=status.HTTP_403_FORBIDDEN)

#! Vista Galeria


class GaleriaViewSet(viewsets.ModelViewSet):
    queryset = Galeria.objects.all()
    serializer_class = GaleriaSerializer
    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para subir archivos'}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar archivos'}, status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar archivos'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para eliminar archivos'}, status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == 'Consul':
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para ver archivos'}, status=status.HTTP_403_FORBIDDEN)

#! Vista Volumen


class VolumenViewSet(viewsets.ModelViewSet):
    queryset = Volumen.objects.all()
    serializer_class = VolumenSerializer
    # * Definimos metodos HTTP permitidos en la vista
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    # * logica para el manejo de roles

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para crear un gasto (para usuarios Admin)
            return super().create(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para crear volumenes'}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar un gasto (para usuarios Admin)
            return super().update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar volumenes'}, status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para actualizar parcialmente un gasto (para usuarios Admin)
            return super().partial_update(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para actualizar volumenes'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para eliminar un gasto (para usuarios Admin)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para eliminar volumenes'}, status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'Admin':
            # Lógica para listar gastos (para usuarios Admin)
            return super().list(request, *args, **kwargs)
        elif request.user.is_authenticated and request.user.rol == 'Consul':
            # Lógica para listar gastos (para usuarios Consul)
            return super().list(request, *args, **kwargs)
        else:
            return Response({'detail': 'No tiene permiso para ver volumenes'}, status=status.HTTP_403_FORBIDDEN)
