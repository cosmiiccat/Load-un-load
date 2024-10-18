# app_name/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('ensure/', views.ensure, name='index'),  
    path('estimate/', views.estimate, name='estimate'), 
    path('booking/', views.book, name='booking'), 
    path('register/', views.register, name='register'), 
    path('login/', views.login, name='login'), 
    path('unassigned/', views.get_unassigned, name='get_unassigned'), 
    path('assigned/', views.get_assigned, name='get_assigned'), 
    path('assign/', views.assign, name='assign'), 
]
