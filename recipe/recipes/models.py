from django.db import models
from django.contrib.postgres.fields import ArrayField

class Recipe(models.Model):
    name = models.CharField(max_length = 200, unique = True)
    ingredients = models.TextField(blank=True, null=True)
    cleaned_ingredients = ArrayField(
        models.IntegerField(),
        size = 50
    )
    instructions = models.TextField(blank=True, null=True)
    picture_link = models.CharField(max_length = 500)
    tags = ArrayField(
        models.CharField(max_length = 200),
        size = 20
    )
    health_info = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'recipes'


class Ingredient(models.Model):
    name = models.CharField(max_length = 200, unique = True)

    class Meta:
        db_table = 'ingredients'
