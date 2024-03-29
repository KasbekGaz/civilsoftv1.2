# Generated by Django 4.2.6 on 2024-02-21 20:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Obra', '0002_obra_total_diferencia'),
    ]

    operations = [
        migrations.CreateModel(
            name='Abono',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('descripcion', models.CharField(max_length=255)),
                ('importe', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('obra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Obra.obra')),
            ],
        ),
    ]
