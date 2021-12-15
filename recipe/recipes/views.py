import json

from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from .models import Recipe, Ingredient
from user.utils import login_decorator

class RecipeListView(View):
    def get(self,request):
        tag = request.GET.get('tag',None)
        id = request.GET.get('id',None)
        if tag:
            result = []
            for recipe in Recipe.objects.all():
                for t in recipe.tags:
                    if t == tag:
                        obj = {
                            'id': recipe.id,
                            'name': recipe.name,
                            'ingredients': recipe.ingredients,
                            'cleaned_ingredients': recipe.cleaned_ingredients,
                            'instructions': recipe.instructions,
                            'info': recipe.info,
                            'link': recipe.link,
                            'tags': recipe.tags
                        }
                        result.append(obj)
            return JsonResponse({'data':result}, status = 200)
        elif id:
            recipe = Recipe.objects.get(id = id)
            obj = {
                    'id': recipe.id,
                    'name': recipe.name,
                    'ingredients': recipe.ingredients,
                    'cleaned_ingredients': recipe.cleaned_ingredients,
                    'instructions': recipe.instructions,
                    'info': recipe.info,
                    'link': recipe.link,
                    'tags': recipe.tags
                }
            return JsonResponse(obj,status=200)
        else:
            result = []
            for recipe in Recipe.objects.all():
                obj = {
                        'id': recipe.id,
                        'name': recipe.name,
                        'ingredients': recipe.ingredients,
                        'cleaned_ingredients': recipe.cleaned_ingredients,
                        'instructions': recipe.instructions,
                        'info': recipe.info,
                        'link': recipe.link,
                        'tags': recipe.tags
                    }
                result.append(obj)
            return JsonResponse({'data':result}, status=200)

    @login_decorator
    def post(self,request):
        try:
            if request.user != '':
                data = json.loads(request.body)
                name = data['name']
                link = data['link']
                instructions = data['instructions']
                tags = data['tags'].split(', ')
                info = data['info']
                ingredients_list = data['ingredients_list'].split(', ')
                encoded_lst = [0]*52
                ingredients = ''
                for ing_name in ingredients_list:
                    ingredient_id = Ingredient.objects.get(name = ing_name).id
                    encoded_lst[ingredient_id - 1] = 1
                    ingredients += ing_name + ", "
                Recipe.objects.create(
                    name = name,
                    ingredients = ingredients,
                    cleaned_ingredients = encoded_lst,
                    instructions = instructions,
                    info = info,
                    link = link,
                    tags = tags
                )
                return HttpResponse(status = 200)
            else:
                return JsonResponse({'message':'INVALID_USER'},status=400)
        except KeyError:
            return JsonResponse({'message':'INVALID_KEYS'},status = 400)
        





