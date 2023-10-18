# Generated by Django 4.2.6 on 2023-10-18 07:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Obra', '0006_rename_localida_obra_localidad_alter_tarea_fcreado'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gasto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('descripcion', models.TextField()),
                ('concepto', models.CharField(max_length=255)),
                ('categoria', models.CharField(choices=[('Administracion', 'Administración'), ('Mano de obra', 'Mano de obra'), ('Materiales', 'Materiales'), ('Viaticos', 'Viáticos'), ('Varios', 'Varios')], max_length=25)),
                ('importe', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]
