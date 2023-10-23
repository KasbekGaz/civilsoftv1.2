# Generated by Django 4.2.6 on 2023-10-23 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Obra', '0030_alter_volumen_estado'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='obra',
            name='diferencia',
        ),
        migrations.RemoveField(
            model_name='obra',
            name='total_contrato',
        ),
        migrations.RemoveField(
            model_name='obra',
            name='total_ejecutado',
        ),
        migrations.AlterField(
            model_name='gasto',
            name='Tipo',
            field=models.CharField(choices=[('Transferencia', 'Transferencia'), ('Efectivo', 'Efectivo')], default='Efectivo', max_length=50),
        ),
        migrations.AlterField(
            model_name='volumen',
            name='estado',
            field=models.CharField(choices=[('Extraordinario', 'Extraordinario'), ('Deduccion', 'Deduccion'), ('Sin cambio', 'Sin cambio'), ('Adicional', 'Adicional')], default='Sin cambio', max_length=30),
        ),
    ]
