from functools import wraps
from django.http import HttpResponseForbidden


# * al rol de administrador
def es_administrador(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.rol == 'administrador':
            return view_func(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("No tienes permisos para acceder a esta vista.")
    return _wrapped_view

# * rol de consultor


def es_consultor(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.rol == 'consultor':
            return view_func(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("No tienes permisos para acceder a esta vista.")
    return _wrapped_view
