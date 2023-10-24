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
    p_inicial = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    #! campo que se dllenan con modelo gasto
    total_gastos = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, editable=False)
    #! campos que se llenan con modelo volumen
    total_importes = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, editable=False)
    total_importes_mod = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, editable=False)

    def __str__(self):
        return f"{self.nombre} ({self.total_gastos}) ({self.total_importes}) ({self.total_importes_mod})"


#! Modelo Tarea
class Tarea(models.Model):
    ESTADO_CHOICES = (
        ('completado', 'Completado'),
        ('no_completado', 'No Completado'),
        ('vencida', 'Vencida')
    )

    Fvence = models.DateField(null=True, blank=True)
    Fcreado = models.DateField(default=timezone.now)
    Fcompletado = models.DateField(null=True, blank=True, editable=False)
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
    CATEGORIAS = [
        ('Administracion', 'Administración'),
        ('Mano de obra', 'Mano de obra'),
        ('Materiales', 'Materiales'),
        ('Viaticos', 'Viáticos'),
        ('Varios', 'Varios'),
    ]

    FACTU = [
        ('Facturado', 'Facturado'),
        ('No Facturado', 'No Facturado'),
    ]

    TIPOS = [
        ('Efectivo', 'Efectivo'),
        ('Transferencia', 'Transferencia'),
    ]

    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    fecha = models.DateField(default=timezone.now)
    proveedor = models.CharField(max_length=255, null=True)
    concepto = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True)
    categoria = models.CharField(max_length=25, choices=CATEGORIAS)
    facturado = models.CharField(
        max_length=50, choices=FACTU, default='No Facturado')
    Tipo = models.CharField(max_length=50, choices=TIPOS, default='Efectivo')
    importe = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        super(Gasto, self).save(*args, **kwargs)  # Guarda el objeto primero
        self.actualizar_total_gastos()

    def delete(self, *args, **kwargs):
        super(Gasto, self).delete(*args, **kwargs)  # Elimina el objeto primero
        self.actualizar_total_gastos()

    def actualizar_total_gastos(self):

        total_gastos = Gasto.objects.filter(obra=self.obra).aggregate(
            total_gastos=models.Sum('importe'))['total_gastos'] or 0
        self.obra.total_gastos = total_gastos
        self.obra.save()

    def __str__(self):
        return f"{self.concepto} ({self.categoria}) ({self.obra})"

#! Modelo de Galeria


class Galeria(models.Model):
    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    descripcion = models.TextField()
    fecha = models.DateField()
    archivo = models.ImageField(upload_to='galeria/')

    def __str__(self):
        return f"{self.obra} ({self.archivo})"


#! Modelo de Comparativa de Volumenes
class Volumen(models.Model):
    status = [
        ('Sin cambio', 'Sin cambio'),
        ('Deduccion', 'Deduccion'),
        ('Adicional', 'Adicional'),
        ('Extraordinario', 'Extraordinario'),
    ]

    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=255)
    unidad = models.CharField(max_length=255)
    concepto = models.CharField(max_length=255)
    estado = models.CharField(
        max_length=30, choices=status, default='Sin cambio')
    # *Campos para cantidad contratada
    volumen = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    importe = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False)
    # * campos para cantidad ejecutada
    v_mod = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    importe_mod = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False)
    diferencia = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False, default=0)

    #! Aqui se guardan las modificaciones de importe_mod e importe
    def save(self, *args, **kwargs):
        # Calcula el importe base
        self.importe = self.volumen * self.precio

        # Si es un registro existente
        if self.pk is not None:
            existing_record = Volumen.objects.get(pk=self.pk)
            # Comprueba si v_mod ha cambiado
            if self.v_mod != existing_record.v_mod:
                # Calcula el importe_mod
                self.importe_mod = self.v_mod * self.precio
                # Verifica el estado
                if self.importe == 0 and self.importe_mod != 0:
                    self.estado = 'Extraordinario'
                elif self.importe == self.importe_mod:
                    self.estado = 'Sin cambio'
                elif self.importe != 0 and self.importe_mod == 0:
                    self.estado = 'Sin cambio'
                else:
                    if self.importe_mod > self.importe:
                        self.estado = 'Adicional'
                    elif self.importe_mod < self.importe:
                        self.estado = 'Deduccion'
            else:
                # Si v_mod no ha cambiado
                if self.v_mod == 0:
                    self.estado = 'Sin cambio'

            # Calcula la diferencia
            self.diferencia = self.importe - self.importe_mod

        else:
            #! Si es un nuevo registro
            # Calcula el importe_mod
            self.importe_mod = self.v_mod * self.precio
            # Verifica el estado
            if self.importe == 0 and self.importe_mod != 0:
                self.estado = 'Extraordinario'
            elif self.importe == self.importe_mod:
                self.estado = 'Sin cambio'
            elif self.importe != 0 and self.importe_mod == 0:
                self.estado = 'Sin cambio'
            else:
                if self.importe_mod > self.importe:
                    self.estado = 'Adicional'
                elif self.importe_mod < self.importe:
                    self.estado = 'Deduccion'

            # Calcula la diferencia
            self.diferencia = self.importe - self.importe_mod

        # Guarda el registro
        super(Volumen, self).save(*args, **kwargs)
        # actualizamos totales:
        self.actualizar_total_importes()
        self.actualizar_total_importes_mod()

    def delete(self, *args, **kwargs):
        super(Volumen, self).delete(*args, **kwargs)
        self.actualizar_total_importes()
        self.actualizar_total_importes_mod()

    #! actualiza valores para la suma del total importe

    def actualizar_total_importes(self):
        total_importes = Volumen.objects.filter(obra=self.obra).aggregate(
            total_importes=models.Sum('importe'))['total_importes'] or 0
        self.obra.total_importes = total_importes
        self.obra.save()

    #! actualiza valores para la suma del total importe modificado

    def actualizar_total_importes_mod(self):
        total_importes_mod = Volumen.objects.filter(obra=self.obra).aggregate(
            total_importes_mod=models.Sum('importe_mod'))['total_importes_mod'] or 0
        self.obra.total_importes_mod = total_importes_mod
        self.obra.save()

    def __str__(self):
        return f"{self.codigo} ({self.importe}) ({self.importe_mod}) ({self.diferencia})"
