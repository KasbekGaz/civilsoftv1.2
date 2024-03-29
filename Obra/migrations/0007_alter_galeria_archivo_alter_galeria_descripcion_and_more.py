# Generated by Django 4.2.6 on 2024-03-19 17:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Obra', '0006_obra_total_abonos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='galeria',
            name='archivo',
            field=models.ImageField(blank=True, default='', upload_to='fotos/'),
        ),
        migrations.AlterField(
            model_name='galeria',
            name='descripcion',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='galeria',
            name='fecha',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
