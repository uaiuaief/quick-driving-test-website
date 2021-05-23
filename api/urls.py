from django.urls import include, path
from . import views


urlpatterns = [
    path('customer/<int:pk>/', views.customer_view, name='customer-detail'),
    path('test', views.test_view, name='testview'),
]
