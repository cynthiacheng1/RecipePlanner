from django.db import models
from django.contrib.postgres.fields import ArrayField
from recipes.models import Recipe

class User(models.Model):
    name = models.CharField(max_length = 500)
    email = models.CharField(max_length = 500, unique = True)
    password = models.CharField(max_length = 500)
    favRecipes = ArrayField(
        models.IntegerField()
    )

    class Meta:
        db_table = 'users'

class Pantry(models.Model):
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    ingredients = ArrayField(
        models.IntegerField()
    )

    class Meta:
        db_table = 'pantry'