# Generated by Django 4.2.6 on 2024-01-06 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contactos', '0005_rename_rfc_proveedor_coderfc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proveedor',
            name='correo',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='proveedor',
            name='telefono',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]