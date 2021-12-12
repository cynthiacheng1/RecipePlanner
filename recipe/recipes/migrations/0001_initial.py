# Generated by Django 3.0.3 on 2021-12-12 13:27

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
            options={
                'db_table': 'ingredients',
            },
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('ingredients', models.TextField(blank=True, null=True)),
                ('cleaned_ingredients', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
                ('instructions', models.TextField(blank=True, null=True)),
                ('info', models.CharField(max_length=1000, null=True)),
                ('link', models.TextField(blank=True, null=True)),
                ('tags', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), size=20)),
            ],
            options={
                'db_table': 'recipes',
            },
        ),
    ]