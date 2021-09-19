from django.urls import path
from .views import Posts


urlpatterns = [
    path('posts/', Posts.as_view())
]
