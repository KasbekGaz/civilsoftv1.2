from django.db import models
# * timezone es para poder tomar la fecha actual al momento de una accion.
from django.utils import timezone
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

    def __str__(self):
        return f"{self.nombre} ({self.rol})"

#! Modelo Obra


class Obra(models.Model):

    nombre = models.CharField(max_length=255)
    localidad = models.CharField(max_length=255)
    municipio = models.CharField(max_length=255)
    dependencia = models.CharField(max_length=255)
    fecha = models.DateField()
    p_inicial = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre

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

    def __str__(self):
        return self.titulo


#! modelo de gasto


class Gasto(models.Model):
    CATEGORIAS = (
        ('Administracion', 'Administración'),
        ('Mano de obra', 'Mano de obra'),
        ('Materiales', 'Materiales'),
        ('Viaticos', 'Viáticos'),
        ('Varios', 'Varios'),
    )

    FACTU = (
        ('Facturado', 'Facturado'),
        ('No Facturado', 'No Facturado'),
    )

    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    fecha = models.DateField()
    descripcion = models.TextField()
    concepto = models.CharField(max_length=255)
    categoria = models.CharField(max_length=25, choices=CATEGORIAS)
    importe = models.DecimalField(max_digits=10, decimal_places=2)
    facturado = models.CharField(
        max_length=255, choices=FACTU, default='No Facturado')
    total_gastos = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, editable=False)

    # * Aqui tenemos la forma de guardar los datos
    def save(self, *args, **kwargs):
        super(Gasto, self).save(*args, **kwargs)  # Guarda el objeto primero
        self.actualizar_total_gastos()

    def delete(self, *args, **kwargs):
        super(Gasto, self).delete(*args, **kwargs)  # Elimina el objeto primero
        self.actualizar_total_gastos()

    def actualizar_total_gastos(self):
        # Actualiza total_gastos sumando los importes de todos los gastos
        total_gastos = Gasto.objects.aggregate(models.Sum('importe'))[
            'importe__sum'] or 0
        Gasto.objects.update(total_gastos=total_gastos)

    def __str__(self):
        return f"{self.concepto} ({self.categoria}) ({self.obra})"


#! Modelo de Comparativa de Volumenes
class Galeria(models.Model):
    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    descripcion = models.TextField()
    fecha = models.DateField()
    archivo = models.ImageField(upload_to='galeria/')


#! Modelo de Galeria
