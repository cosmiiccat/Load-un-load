# app_name/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('ensure/', views.ensure, name='index'),  
    path('estimate/', views.estimate, name='estimate'), 
    path('booking/', views.book, name='booking'), 
]
