# Generated by Django 4.2.6 on 2023-10-23 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Obra', '0027_alter_gasto_tipo_alter_volumen_estado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gasto',
            name='Tipo',
            field=models.CharField(choices=[('Efectivo', 'Efectivo'), ('Transferencia', 'Transferencia')], default='Efectivo', max_length=50),
        ),
        migrations.AlterField(
            model_name='volumen',
            name='estado',
            field=models.CharField(choices=[('Extraordinario', 'Extraordinario'), ('Adicional', 'Adicional'), ('Sin cambio', 'Sin cambio'), ('Deduccion', 'Deduccion')], default='Sin cambio', max_length=30),
        ),
    ]
