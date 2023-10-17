from django.db import models
# * timezone es para poder tomar la fecha actual al momento de una accion.
from django.utils import timezone

# Create your models here.

# ! modelo de Usuario


class Usuario(models.Model):
    ROLES = (
        ('Administrador', 'Administrador'),
        ('Consultor', 'Consultor')
    )

    nombre = models.CharField(max_length=255)
    correo = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    rol = models.CharField(max_length=15, choices=ROLES)
    # * relacion de muchos a muchos de la tabla usuario a obras
    obras = models.ManyToManyField('Obra', related_name='usuarios')

#! Modelo Obra


class Obra(models.Model):

    nombre = models.CharField(max_length=255)
    localidad = models.CharField(max_length=255)
    municipio = models.CharField(max_length=255)
    dependencia = models.CharField(max_length=255)
    fecha = models.DateField()
    p_inicial = models.DecimalField(max_digits=10, decimal_places=2)

#! Modelo Tarea


class Tarea(models.Model):
    ESTADO_CHOICES = (
        ('completado', 'Completado'),
        ('no_completado', 'No Completado'),
        ('vencida', 'Vencida')
    )

    Fvence = models.DateField(null=True, blank=True)
    Fcreado = models.DateField(default=timezone.now)
    Fcompletado = models.DateField(null=True, blank=True)
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    estado = models.CharField(
        max_length=15, choices=ESTADO_CHOICES, default='no_completado')
    obra = models.ForeignKey('Obra', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.estado == 'completado' and not self.Fcompletado:
            self.Fcompletado = timezone.now().date()
        if not self.Fvence and self.estado == 'completado':
            self.Fvence = timezone.now().date()
        super(Tarea, self).save(*args, **kwargs)
