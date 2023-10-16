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
