# Generated by Django 4.2.6 on 2024-03-05 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contactos', '0007_alter_proveedor_telefono'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proveedor',
            name='correo',
            field=models.CharField(max_length=50),
        ),
    ]
