from django.urls import include, path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'test-centers', views.TestCenterViewSet)
#router.register(r'time-ranges', views.TimeRangeViewSet)
router.register(r'proxies', views.ProxyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    #path('user/<int:pk>/', views.customer_view, name='user_detail'),
    path('add-available-dates/<str:test_center_name>/', views.add_available_date_view, name='add_dates'),
    path('proxy-customer-pair/', views.ProxyCustomerPairView.as_view(), name='proxy_customer_pair'),
    path('test', views.test_view, name='testview'),

    path('login/', views.LoginView.as_view(), name='login_view'),
    path('logout/', views.LogoutView.as_view(), name='logout_view'),
    path('user-profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('get_user/', views.get_user_view, name='get_user'),
    path('change-email/', views.ChangeEmailView.as_view(), name='change_email'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change_password'),
    path('send-message/', views.SendMessageView.as_view(), name='send_message'),

    path('create-account/', views.SignupView.as_view(), name='create_account'),
    path('stripe-webhook/', views.StripeWebhookView.as_view(), name='stripe_webhook'),

    path('recover-password/', views.RecoverPasswordView.as_view(), name='recover_password'),
    path('unauthenticated-change-password/', views.UnauthenticatedChangePasswordView.as_view(), name='unauthenticated_change_password'),
]
