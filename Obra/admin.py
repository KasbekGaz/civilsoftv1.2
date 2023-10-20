from django.contrib import admin
from .models import Usuario, Obra, Tarea, Gasto, Galeria, Volumen
# Register your models here.

# * Para la app de obra
admin.site.register(Usuario)
admin.site.register(Obra)
admin.site.register(Tarea)
admin.site.register(Gasto)
admin.site.register(Galeria)
admin.site.register(Volumen)

# * para la obra de Proveedor
