from django.db import models
from django.contrib.postgres.fields import ArrayField

class Recipe(models.Model):
    name = models.TextField()
    ingredients = models.TextField(blank=True, null=True)
    cleaned_ingredients = ArrayField(
        models.IntegerField()
    )
    instructions = models.TextField(blank=True, null=True)
    info = models.CharField(max_length = 1000, null = True)
    link = models.TextField(blank=True, null=True)
    tags = ArrayField(
        models.CharField(max_length = 200),
        size = 20
    )
    

    class Meta:
        db_table = 'recipes'


class Ingredient(models.Model):
    name = models.CharField(max_length = 200, unique = True)

    class Meta:
        db_table = 'ingredients'
