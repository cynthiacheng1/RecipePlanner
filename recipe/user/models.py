from django.db import models
from django.contrib.postgres.fields import ArrayField
from recipes.models import Recipe

class User(models.Model):
    email = models.EmailField(max_length = 200, unique = True)
    password = models.CharField(max_length = 200, unique = True)
    fav_recipe = models.ForeignKey(Recipe, on_delete = models.SET_NULL, null=True)

    class Meta:
        db_table = 'users'

class Pantry(models.Model):
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    ingredients = ArrayField(
        models.IntegerField(),
        size = 50
    )

    class Meta:
        db_table = 'pantries'