from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'test-centers', views.TestCenterViewSet)
router.register(r'proxies', views.ProxyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),


    #Other urls
    path('send-message/', views.SendMessageView.as_view(), name='send_message'),


    #User creations urls
    path('create-account/', views.SignupView.as_view(), name='create_account'),
    path('stripe-webhook/', views.StripeWebhookView.as_view(), name='stripe_webhook'),


    #User update urls
    path('change-email/', views.ChangeEmailView.as_view(), name='change_email'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change_password'),


    #User detail urls
    path('user-profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('get-user/', views.GetUserView.as_view(), name='get_user'),


    #Authentication urls
    path('login/', views.LoginView.as_view(), name='login_view'),
    path('logout/', views.LogoutView.as_view(), name='logout_view'),


    #Password recovery urls
    path('recover-password/', views.RecoverPasswordView.as_view(), name='recover_password'),
    path('unauthenticated-change-password/', 
        views.UnauthenticatedChangePasswordView.as_view(),
        name='unauthenticated_change_password'),


    #Crawler urls
    path('valid-proxy/', views.GetValidProxyView.as_view(), name='valid_proxy'),
    path('unchecked-customers/', views.UncheckedCustomersView.as_view(), name='unchecked_customers'),
    path('test-found/', views.TestFoundView.as_view(), name='test_found'),
    path('ban-proxy/', views.BanProxyView.as_view(), name='ban_proxy'),
    path('proxy-customer-pair/', views.ProxyCustomerPairView.as_view(), name='proxy_customer_pair'),
    path('set-user-info-validation/', views.UserInfoValidationView.as_view(), name='info-validation'),
]
