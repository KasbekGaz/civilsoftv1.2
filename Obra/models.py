from django.db import models

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
    localida = models.CharField(max_length=255)
    municipio = models.CharField(max_length=255)
    dependencia = models.CharField(max_length=255)
    fecha = models.DateField()
    p_inicial = models.DecimalField(max_digits=10, decimal_places=2)
