# Generated by Django 4.2.4 on 2023-11-11 21:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contactos', '0003_material_unidad'),
    ]

    operations = [
        migrations.RenameField(
            model_name='banca',
            old_name='proovedor',
            new_name='proveedor',
        ),
        migrations.RenameField(
            model_name='material',
            old_name='proovedor',
            new_name='proveedor',
        ),
    ]