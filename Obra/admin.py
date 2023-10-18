from django.contrib import admin
from .models import Usuario, Obra, Tarea, Gasto
# Register your models here.
admin.site.register(Usuario)
admin.site.register(Obra)
admin.site.register(Tarea)
admin.site.register(Gasto)
