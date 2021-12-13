from django.urls import path
from .views import FavoriteRecipeView, PantryRecipeView, SignUpView,SignInView,ProfileView,PantryView

urlpatterns = [
    path('/signup', SignUpView.as_view()),
    path('/signin', SignInView.as_view()),
    path('/info', ProfileView.as_view()),
    path('/pantry', PantryView.as_view()),
    path('/pantry-recipe', PantryRecipeView.as_view()),
    path('/favorite', FavoriteRecipeView.as_view())
]
