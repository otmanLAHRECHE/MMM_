# Generated by Django 4.1 on 2023-03-15 13:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('DMM', '0002_fournisseur_adress'),
    ]

    operations = [
        migrations.AddField(
            model_name='materiel',
            name='num_inv',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
    ]
