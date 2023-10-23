# Generated by Django 4.2.6 on 2023-10-23 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Obra', '0023_alter_volumen_estado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='volumen',
            name='estado',
            field=models.CharField(choices=[('Deduccion', 'Deduccion'), ('Sin cambio', 'Sin cambio'), ('Adicional', 'Adicional'), ('Extraordinario', 'Extraordinario')], default='Sin cambio', max_length=30),
        ),
    ]
