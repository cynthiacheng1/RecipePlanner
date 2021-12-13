import json
import bcrypt
import jwt

from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render


from .models import User
from django.conf import settings
from .utils import login_decorator

class SignUpView(View):
    def post(self,request):
        try:
            data = json.loads(request.body)
            password = bcrypt.hashpw(data['password'].encode('utf-8'),bcrypt.gensalt())
            crypted = password.decode('utf-8')
            User.objects.create(
                name = data['name'],
                email = data['email'],
                password = crypted
            )
            return HttpResponse(status = 200)
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
        