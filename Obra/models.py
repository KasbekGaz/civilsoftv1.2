from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, telefono=None, rol='Consul'):
        if not email:
            raise ValueError('El correo electrónico es obligatorio')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email,
                          telefono=telefono, rol=rol)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, telefono=None, rol='Admin'):
        user = self.create_user(username, password, telefono, rol)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):

    ROL_CHOICES = (
        ('Admin', 'Admin'),
        ('Consul', 'Consul'),
    )

    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    rol = models.CharField(
        max_length=10, choices=ROL_CHOICES, default='Consul')

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    def __str__(self):
        return f"{self.username} ({self.rol})"


#! Modelo Obra


class Obra(models.Model):

    nombre = models.CharField(max_length=255)
    localidad = models.CharField(max_length=255)
    municipio = models.CharField(max_length=255)
    dependencia = models.CharField(max_length=255)
    fecha = models.DateField()
    p_inicial = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    #! Total gastos de una obra (volumen)
    total_gastos = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, editable=False)
    #! Total importes e importe modificados de una obra (volumen)
    total_importes = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, editable=False)
    total_importes_mod = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, editable=False)
    #! Total de diferencias (volumen)
    total_diferencia = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, editable=False)
    #! Total de Abonos (Abono)
    total_abonos = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, editable=False)

    def __str__(self):
        return f"{self.nombre} ({self.total_gastos}) ({self.total_importes}) ({self.total_importes_mod}) ({self.total_diferencia}) ({self.total_abonos})"


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
        # * si el estado es copmletado en Fcompletado pone la fecha de cuando se completa
        if self.estado == 'completado' and not self.Fcompletado:
            self.Fcompletado = timezone.now().date()
            # * si no tiene nada Fvence y el estado es completado pone la fecha de cuando se crea
        if not self.Fvence and self.estado == 'completado':
            self.Fvence = timezone.now().date()
            # * si Fvence es menor que la fecha actual y el estado es diferemte de completado se asigna como VENCIDA
        if self.Fvence and self.Fvence < timezone.now().date() and self.estado != 'completado':
            self.estado = 'vencida'
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
    descripcion = models.TextField(blank=True)
    fecha = models.DateField(default=timezone.now)
    archivo = models.ImageField(blank=True, default='', upload_to='fotos/')

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
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    importe = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False)
    # * campos para cantidad ejecutada
    v_mod = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    importe_mod = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False, default=0)
    diferencia = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False, default=0)

    #! Aqui se guardan las modificaciones de importe_mod e importe
    def save(self, *args, **kwargs):
        # Calcula el importe base
        self.importe = self.volumen * self.precio
        self.importe_mod = self.v_mod * self.precio

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
        self.actualizar_total_diferencia()

    def delete(self, *args, **kwargs):
        super(Volumen, self).delete(*args, **kwargs)
        self.actualizar_total_importes()
        self.actualizar_total_importes_mod()
        self.actualizar_total_diferencia()

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

    #! Actualizar valores de suma Total diferencia
    def actualizar_total_diferencia(self):
        total_diferencia = Volumen.objects.filter(obra=self.obra).aggregate(
            total_diferencia=models.Sum('diferencia'))['total_diferencia'] or 0
        self.obra.total_diferencia = total_diferencia
        self.obra.save()

    def __str__(self):
        return f"{self.codigo} ({self.importe}) ({self.importe_mod}) ({self.diferencia})"

#! Modelo de Abonos


class Abono(models.Model):
    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    fecha = models.DateField()
    descripcion = models.TextField(blank=True)
    importe = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def save(self, *args, **kwargs):
        super(Abono, self).save(*args, **kwargs)  # Guarda el objeto primero
        self.actualizar_total_abonos()

    def delete(self, *args, **kwargs):
        super(Abono, self).delete(*args, **kwargs)  # Elimina el objeto primero
        self.actualizar_total_abonos()

    def actualizar_total_abonos(self):
        total_abonos = Abono.objects.filter(obra=self.obra).aggregate(
            total_abonos=models.Sum('importe'))['total_abonos'] or 0
        self.obra.total_abonos = total_abonos
        self.obra.save()
