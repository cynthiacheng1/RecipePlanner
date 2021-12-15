from django.urls import path
from .views import FavoriteView, FavoriteDeleteView, GetPantryView, AddPantryView, FavoriteRecipeView, PantryDeleteView, PantryRecipeView, SignUpView,SignInView,ProfileView

urlpatterns = [
    path('/signup', SignUpView.as_view()),
    path('/signin', SignInView.as_view()),
    path('/info', ProfileView.as_view()),
    path('/addpantry', AddPantryView.as_view()),
    path('/pantry', GetPantryView.as_view()),
    path('/pantry-recipe', PantryRecipeView.as_view()),
    path('/addfavorite/<int:recipe_id>', FavoriteRecipeView.as_view()),
    path('/pantry-delete', PantryDeleteView.as_view()),
    path('/favorite-delete',FavoriteDeleteView.as_view()),
    path('/favorite', FavoriteView.as_view())
]
