from django.contrib import admin
from .models import CustomUser, Obra, Tarea, Gasto, Galeria, Volumen
# Register your models here.

# * Para la app de obra
admin.site.register(CustomUser)
admin.site.register(Obra)
admin.site.register(Tarea)
admin.site.register(Gasto)
admin.site.register(Galeria)
admin.site.register(Volumen)
