# Generated by Django 4.2.6 on 2024-02-26 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Obra', '0003_abono'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abono',
            name='descripcion',
            field=models.TextField(blank=True),
        ),
    ]
