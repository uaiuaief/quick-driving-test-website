from django.urls import include, path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'customers', views.CustomerViewSet)
router.register(r'test-centers', views.TestCenterViewSet)
#router.register(r'time-ranges', views.TimeRangeViewSet)
router.register(r'proxies', views.ProxyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('customer/<int:pk>/', views.customer_view, name='customer-detail'),
    path('add-available-dates/<str:test_center_name>/', views.add_available_date_view, name='add-dates'),
    path('proxy-customer-pair/', views.ProxyCustomerPairView.as_view(), name='proxy-customer-pair'),
    path('test', views.test_view, name='testview'),
]
