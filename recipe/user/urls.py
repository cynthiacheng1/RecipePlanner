from django.urls import path
from .views import FavoriteView, FavoriteDeleteView, GetPantryView, AddPantryView, FavoriteRecipeView, PantryDeleteView, PantryRecipeView, SignUpView,SignInView,ProfileView

urlpatterns = [
    path('/signup', SignUpView.as_view()),
    path('/signin', SignInView.as_view()),
    path('/info', ProfileView.as_view()),
    path('/addpantry/<str:ingredient>', AddPantryView.as_view()),
    path('/pantry', GetPantryView.as_view()),
    path('/pantry-recipe', PantryRecipeView.as_view()),
    path('/addfavorite', FavoriteRecipeView.as_view()),
    path('/pantry-delete/<str:ingredient>', PantryDeleteView.as_view()),
    path('/favorite-delete/<int:recipe_id>',FavoriteDeleteView.as_view()),
    path('/favorite/<int:recipe_id>', FavoriteView.as_view())
]
