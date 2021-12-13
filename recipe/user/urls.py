from django.urls import path
from .views import SignUpView,SignInView,ProfileView

urlpatterns = [
    path('/signup', SignUpView.as_view()),
    path('/signin', SignInView.as_view()),
    path('/info', ProfileView.as_view())
]
