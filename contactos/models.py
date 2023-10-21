from django.db import models

# Create your models here.


from django.db import models


class Proveedor(models.Model):
    nombre_comercial = models.CharField(max_length=255)
    razon_social = models.CharField(max_length=255)
    telefono = models.CharField(max_length=15)
    correo = models.EmailField(max_length=255)
    RFC = models.CharField(max_length=13)
    descripcion = models.TextField()
    banco = models.CharField(max_length=255)
    cuenta_banco = models.CharField(max_length=20)
    clave_banco = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre_comercial


class Material(models.Model):
    proovedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    material = models.CharField(max_length=255)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.material} ({self.proovedor})"
