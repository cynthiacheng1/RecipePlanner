import json
import bcrypt
import jwt

from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render


from .models import User, Pantry
from recipes.models import Recipe, Ingredient
from django.conf import settings
from .utils import login_decorator

class SignUpView(View):
    def post(self,request):
        try:
            data = json.loads(request.body)
            password = bcrypt.hashpw(data['password'].encode('utf-8'),bcrypt.gensalt())
            crypted = password.decode('utf-8')
            created_user = User.objects.create(
                name = data['name'],
                email = data['email'],
                password = crypted,
                favRecipes = []
            )
            Pantry.objects.create(
                user = created_user,
                ingredients = [0] * 52
            )
            res_object = {
                "name" : data['name'],
                "email" : data['email'],
                "password" : data['password']
            }
            return JsonResponse(res_object,status = 200)
        except KeyError:
            return JsonResponse({'message':'INVALID_KEYS'},status = 400)
        

class SignInView(View):
    def post(self,request):
        data = json.loads(request.body)
        SECRET_KEY = getattr(settings, "SECRET_KEY", None)
        try:
            if User.objects.filter(email = data['email']).exists():
                user = User.objects.get(email = data['email'])
                if bcrypt.checkpw(data['password'].encode('utf-8'),user.password.encode('utf-8')):
                    token = jwt.encode({'email':data['email']}, SECRET_KEY, algorithm = 'HS256')
                    token = token.decode('utf-8')
                    return JsonResponse({'token':token}, status = 200)
                else:
                    return JsonResponse({'message':'INVALID_USER'}, status = 401)
            else:
                return JsonResponse({'message':'INVALID_USER'}, status = 401)
        except KeyError:
            return JsonResponse({'message':'INVALID_KEYS'}, status = 400)

class ProfileView(View):
    @login_decorator
    def get(self,request):
        try:
            if request.user != '':
                user = User.objects.get(id = request.user.id)
                res_object = {
                    "name" : user.name,
                    "email" : user.email,
                    "favRecipes" : user.favRecipes
                }
            return JsonResponse(res_object, status = 200)
        except KeyError:
            return JsonResponse({'message':'INVALID_KEYS'}, status = 400)

class AddPantryView(View):
    @login_decorator
    def post(self,request):
        try:
            if request.user != '':
                data = json.loads(request.body)
                ingredient = data['theIngredient']
                pantry = Pantry.objects.get(user_id = request.user.id)
                if Ingredient.objects.filter(name = ingredient).exists():
                    ing_id = Ingredient.objects.get(name = ingredient).id
                    if pantry.ingredients[ing_id - 1] == 0:
                        pantry.ingredients[ing_id - 1] = 1
                        pantry.save()
                        return HttpResponse(status=200)
                    else:
                        return JsonResponse({'message':'DUPLICATE_ENTRIES'}, status=400)
            else:
                return JsonResponse({'message':'INVALID_USER'}, status=400)
        except:
            return JsonResponse({'message':'INVALID_KEYS'}, status=400)

class GetPantryView(View):
    @login_decorator
    def get(self,request):
        try:
            if request.user != '':
                pantry = Pantry.objects.get(user_id = request.user.id)
                result = []
                for i in range(52):
                    if pantry.ingredients[i]:
                        result.append(Ingredient.objects.get(id=i+1).name)
                return JsonResponse({'data':result},status=200)
            else:
                return JsonResponse({'message':'INVALID_USER'}, status=400)
        except:
            return JsonResponse({'message':'INVALID_KEYS'}, status=400)

class PantryDeleteView(View):
    @login_decorator
    def post(self,request):
        try:
            if request.user != '':
                data = json.loads(request.body)
                ingredient = data['theIngredient']
                pantry = Pantry.objects.get(user_id = request.user.id)
                if Ingredient.objects.filter(name = ingredient).exists():
                    ing_id = Ingredient.objects.get(name = ingredient).id
                    if pantry.ingredients[ing_id - 1] == 1:
                        pantry.ingredients[ing_id - 1] = 0
                        pantry.save()
                        return HttpResponse(status=200)
                    else:
                        return JsonResponse({'message':'NOT_EXISTS'}, status=400)
            else:
                return JsonResponse({'message':'INVALID_USER'}, status=400)
        except:
            return JsonResponse({'message':'INVALID_KEYS'}, status=400)
    
class PantryRecipeView(View):
    @login_decorator
    def get(self,request):
        try:
            if request.user != '':
                pantry = Pantry.objects.get(user_id = request.user.id)
                result = []
                for recipe in Recipe.objects.all():
                    for i in range(52):
                        if recipe.cleaned_ingredients[i] and not pantry.ingredients[i]:
                            break
                    else:
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
                return JsonResponse({'data':result},status=200)
            else:
                return JsonResponse({'message':'INVALID_USER'}, status=400)
        except:
            return JsonResponse({'message':'INVALID_KEYS'}, status=400)

class FavoriteRecipeView(View):
    @login_decorator
    def post(self,request,recipe_id):
        try:
            if request.user != '':
                user = User.objects.get(id = request.user.id)
                user.favRecipes.append(recipe_id)
                user.save()
                return HttpResponse(status=200)
            else:
                return JsonResponse({'message':'INVALID_USER'}, status=400)
        except:
            return JsonResponse({'message':'INVALID_KEYS'}, status=400)

class FavoriteView(View): 
    @login_decorator
    def get(self,request):
        try:
            if request.user != '':
                favRecipes = User.objects.get(id = request.user.id).favRecipes
                result = []
                for id in favRecipes:
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
                    result.append(obj)
                return JsonResponse({'data':result},status=200)
            else:
                return JsonResponse({'message':'INVALID_USER'}, status=400)
        except:
            return JsonResponse({'message':'INVALID_KEYS'}, status=400)

class FavoriteDeleteView(View):
    @login_decorator
    def post(self,request):
        try:
            if request.user != '':
                user = User.objects.get(id = request.user.id)
                data = json.loads(request.body)
                recipe_id = data['id']
                user.favRecipes.remove(recipe_id)
                user.save()
                return HttpResponse(status=200)
            else:
                return JsonResponse({'message':'INVALID_USER'}, status=400)
        except:
            return JsonResponse({'message':'INVALID_KEYS'}, status=400)