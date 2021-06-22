import json
import datetime
import stripe
import os
from django.utils.crypto import get_random_string
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.views import View
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from django.db.utils import IntegrityError
from . import models, serializers
from pprint import pprint
import email_sender


class UserCreationMixin():
    def _create_user(self, data):
        #pprint(data)
        email = data.pop('email')
        password = data.pop('password')

        user = models.User.objects.create_user(email=email, password=password)
        user.save()

        try:
            test_centers = data.pop('test_centers')

            profile = models.Profile(
                    user = user,
                    **data
            )

            profile.save()

            for each in test_centers:
                profile.test_centers.add(each)

        except Exception as e:
            user.delete()
            raise e

        return user

    def _create_test_center(self, test_center_name):
        try:
            test_center = models.TestCenter.objects.get(name=test_center_name)
            
            return test_center
        except models.TestCenter.DoesNotExist as e:
            test_center = models.TestCenter(name=test_center_name)
            test_center.save()

            return test_center

    def _translate_request_data(self, data):
        translated_data = {}

        for k in data:
            if data[k] == '':
                continue
            elif k == 'confirm_password':
                continue
            elif k == 'phone_number':
                translated_data['mobile_number'] = data[k]
            elif k == 'test_after':
                translated_data['earliest_test_date'] = data[k]
            elif k == 'test_before':
                translated_data['latest_test_date'] = data[k]
            elif k == 'desired_test_center_1':
                translated_data['test_centers'] = [self._create_test_center(data[k])]
            elif k == 'desired_test_center_2':
                translated_data['test_centers'].append(self._create_test_center(data[k]))
            elif k == 'desired_test_center_3':
                translated_data['test_centers'].append(self._create_test_center(data[k]))
            elif k == 'desired_test_center_4':
                translated_data['test_centers'].append(self._create_test_center(data[k]))
            else:
                translated_data[k] = data[k]

        #pprint(translated_data)
        return translated_data


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    def retrieve(self, request, pk):

        return HttpResponse(request.user.email)

    def create(self, request):
        normalized_data = self.normalize_data(request.data)
        try:
            user = self.create_user(normalized_data)
        except IntegrityError as e:
            return JsonResponse({
                "error":  "An user with that email already exists"
                }, status=403)

        return HttpResponse(status=201)

    def create_user(self, data):
        email = data.pop('email')
        password = data.pop('password')

        user = models.User.objects.create_user(email=email, password=password)
        user.save()

        main_test_center = self.create_test_center(data)

        try:
            profile = models.Profile(
                    user = user,
                    main_test_center=main_test_center,
                    **data
            )

            profile.save()
        except TypeError as e:
            user.delete()
            raise e

        return user

    def create_test_center(self, data):
        desired_test_center = data.pop('desired_test_center')
        test_center =  models.TestCenter.objects.filter(name=desired_test_center).first()

        if test_center:
            main_test_center = test_center
        else:
            main_test_center = models.TestCenter(name=desired_test_center)
            main_test_center.save()

        return main_test_center

    def normalize_data(self, data):
        normalized_data = {}

        for k in data:
            if data[k] == '':
                continue
            elif k == 'confirm_password':
                continue
            elif k == 'test_after':
                normalized_data['earliest_test_date'] = data[k]
            elif k == 'test_before':
                normalized_data['latest_test_date'] = data[k]
            else:
                normalized_data[k] = data[k]

        return normalized_data


class TestCenterViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = models.TestCenter.objects.all()
    serializer_class = serializers.TestCenterSerializer


class ProxyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = models.Proxy.objects.all()
    serializer_class = serializers.ProxySerializer


class GetUserView(APIView):
    permission_classes = [permissions.AllowAny]
    #permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return JsonResponse({'user': str(request.user)})


class UserProfileView(APIView, UserCreationMixin):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({
            'error': "Please provide your credentials"
            }, status=401)

        return JsonResponse(serializers.UserSerializer(request.user).data)

    def patch(self, request):
        user = request.user
        if not user.is_authenticated:
            return JsonResponse({
                'error': "You must be logged in to view this page"
                }, status=401)

        data = self._translate_data_for_account(request.data)
        
        self._update_profile(user, data)

        return JsonResponse({
            'message': 'User updated successfully'
            }, status=200)

    def _translate_data_for_account(self, data):
        data = self._translate_request_data(data)
        translated_data = {}

        for k in data:
            if k == 'email':
                continue
            elif k == 'password':
                continue
            else:
                translated_data[k] = data[k]

        return translated_data

    def _translate_data_for_dashboard(self, data):
        pass

    def _update_profile(self, user, data):
        for each in user.profile.test_centers.all():
            user.profile.test_centers.remove(each)
        
        if data.get('test_centers'):
            for each in data.pop('test_centers'):
                user.profile.test_centers.add(each)

        profile = models.Profile.objects.get(user=user)
        for attr in data:
            if hasattr(profile, attr):
                setattr(profile, attr, data[attr])
            else:
                raise KeyError(f'Profile has no attribute {attr}')
        
        profile.save()


class ChangeEmailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        user = request.user

        error = self.get_request_errors(request)
        if error:
            return error

        user.email = data.get('new_email')
        user.save()

        logout(request)
        login(request, user)

        return JsonResponse({}, status=204)

    def get_request_errors(self, request):
        data = request.data
        user = request.user

        if not user.is_authenticated:
            return JsonResponse({
                'error': "You must be logged in to view this page",
                'code': 0
                }, status=401)

        if not data.get('password'):
            return JsonResponse({
                'error': "Please provide your credentials",
                'code': 1
                }, status=401)

        if not data.get('new_email'):
            return JsonResponse({
                'error': "Please provide your new email",
                'code': 2
                }, status=400)

        if not user.check_password(data.get('password')):
            return JsonResponse({
                'error': "Wrong password",
                'code': 3
                }, status=401)
        try:
            models.User.objects.get(email=data.get('new_email'))
            return JsonResponse({
                'error': "A user with that email already exists",
                'code': 4
                }, status=403)
        except models.User.DoesNotExist:
            pass


        return None


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        data = request.data
        user = request.user

        error = self.get_request_errors(request)
        if error:
            return error

        user.password = make_password(data.get('new_password'))
        user.save()

        logout(request)
        login(request, user)

        return JsonResponse({}, status=204)

    def get_request_errors(self, request):
        data = request.data
        user = request.user

        if not user.is_authenticated:
            return JsonResponse({
                'error': "You must be logged in to view this page",
                'code': 1
                }, status=401)

        if not data.get('current_password'):
            return JsonResponse({
                'error': "Please provide your credentials",
                'code': 2
                }, status=401)

        if not data.get('new_password'):
            return JsonResponse({
                'error': "Please provide your new password",
                'code': 3
                }, status=400)

        if not user.check_password(data.get('current_password')):
            return JsonResponse({
                'error': "Wrong password",
                'code': 4
                }, status=401)

        return None


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        logout(request)

        return HttpResponse(status=200)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'user': str(user)})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)


class SendMessageView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        error = self.get_request_errors(request)
        if error:
            return error

        name = request.data.get('name') or request.user.profile.get_full_name()
        email = request.data.get('email') or request.user.email
        
        subject = f'Name: {name} - Email: {email}'
        body = request.data['message']
        email_sender.send_simple_email(
                'support@quickdrivingtest.co.uk',
                subject,
                body,
        )

        return JsonResponse({}, status=200)

    def get_request_errors(self, request):
        data = request.data
        user = request.user

        if not (user.is_authenticated or data.get('email')):
            return JsonResponse({
                'error': "Please provide your email to send a message",
                'code': 1
                }, status=401)
        if data.get('email') and not data.get('name'):
            return JsonResponse({
                'error': "Please provide your name to send a message",
                'code': 2
                }, status=401)
        if not data.get('message'):
            return JsonResponse({
                'error': "Please fill in the forms to send a message",
                'code': 3
                }, status=401)


stripe.api_key = settings.STRIPE_SK
endpoint_secret = settings.ENDPOINT_SECRET

class SignupView(APIView, UserCreationMixin):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            self._validate_user(request)
        except IntegrityError:
            return JsonResponse({
                "error":  "An user with that email already exists"
                }, status=403)

        try:
            checkout_session = stripe.checkout.Session.create(
                    payment_method_types=['card'],
                    line_items=[
                        {
                            'price_data': {
                                'currency': 'usd',
                                'unit_amount': 3000,
                                'product_data': {
                                    'name': 'Plan I'
                                },

                            },
                            'quantity': 1,
                        }
                    ],
                    mode='payment',
                    success_url="http://localhost:3000/",
                    cancel_url="http://localhost:3000/",
                    metadata=request.data
            )
            return JsonResponse({'id': checkout_session.id})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)

    def _validate_user(self, request):
        translated_data = self._translate_request_data(request.data)

        user = self._create_user(translated_data)
        user.delete()


class StripeWebhookView(APIView, UserCreationMixin):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        event = None

        try:
            event = stripe.Webhook.construct_event(
                    payload, sig_header, endpoint_secret
            )
        except ValueError as e:
            print('invalid payload')
            return JsonResponse({'error': 'invalid payload'}, status=400)
        except stripe.error.SignatureVerificationError as e:
            print(e)
            print('invalid signature')
            return JsonResponse({'error': 'invalid signature'}, status=400)

        
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']

            self.fulfill_order(session)

        return HttpResponse(status=200)

    def fulfill_order(self, session):
        data = self._translate_request_data(session.get('metadata'))
        self._create_user(data)


class RecoverPasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if not request.data.get('email'):
            return JsonResponse({
                'error':'email is required'
                }, status=400)

        try:
            token_hash = self._generate_url(request.data['email'])
        except models.User.DoesNotExist:
            return JsonResponse({
                'error':'There is no user with that email'
                }, status=404)

        #send_email(
        #        to=request.data['email'],
        #        subject="Password Recovery",
        #        body=f"http://localhost:3000/choose-new-password?token={token_hash}"
        #        )

        user = models.User.objects.get(email=request.data['email'])
        email_sender.send_password_recovery_email(
                'receiver',
                user.profile.first_name,
                f'http://localhost:3000/choose-new-password?token={token_hash}'
                )

        return JsonResponse({'msg':'success'}, status=200)
    
    def _generate_url(self, email):
        user = models.User.objects.get(email=email)
        token_hash = get_random_string(length=32)

        token = models.Token(token_hash=token_hash, user=user)
        token.save()

        return token_hash


class UnauthenticatedChangePasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        if not request.data.get('token'):
            return JsonResponse({
                'error':'Token is required'
                }, status=403)
        
        if not request.data.get('new_password'):
            return JsonResponse({
                'error':'new password is required'
                }, status=400)

        try:
            token = models.Token.objects.get(token_hash=request.data['token'])
        except models.Token.DoesNotExist:
            return JsonResponse({
                'error':'Invalid token',
                'code': 1
                }, status=403)

        if token.is_expired():
            return JsonResponse({
                'error':'Token expired',
                'code': 2
                }, status=403)

        user = token.user
        user.password = make_password(request.data.get('new_password'))
        user.save()
        token.delete()
            
        return JsonResponse({}, status=204)


""" CRAWLER VIEWS """
class ProxyCustomerPairView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        print(request.data)
        data = self.find_usable_pair()

        if not data:
            return JsonResponse({
                'error': 'There are no customers or proxies available'
                }, status=200)
        else:
            return JsonResponse(data)

    def find_usable_pair(self):
        user = self.find_usable_user()
        proxy = self.find_usable_proxy()

        if user and proxy:
            user.profile.last_crawled = datetime.datetime.now()
            proxy.last_used = datetime.datetime.now()

            user.profile.save()
            proxy.save()

            return {
                    'customer': serializers.UserSerializer(user).data,
                    'proxy': serializers.ProxySerializer(proxy).data
                    }
        else:
            return None


    def find_usable_user(self):
        time_limit = datetime.datetime.now() - datetime.timedelta(minutes=1)
        profile = models.Profile.objects.filter(
                last_crawled__lte=time_limit,
                info_validation='valid').order_by('last_crawled').first()

        if profile:
            return profile.user
        else:
            return None

    def find_usable_proxy(self):
        time_limit = datetime.datetime.now() - datetime.timedelta(minutes=1)
        usable_proxy = models.Proxy.objects.order_by('last_used').filter(
                last_used__lte=time_limit,
                is_banned=False).first()

        return usable_proxy

class UserInfoValidationView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        error = self._get_request_errors(request)
        if error:
            return error

        try:
            user = models.User.objects.get(id=request.data['user_id'])
        except models.User.DoesNotExist:
            return JsonResponse({
                'error': 'User with that ID does not exist'
                }, status=404)

        profile = user.profile
        profile.info_validation = request.data['info_validation']
        profile.save()

        return JsonResponse({}, status=200)

    def _get_request_errors(self, request):
        if not request.data.get('user_id'):
            return JsonResponse({
                'error': 'Must provide `user_id`'
                }, status=400)
        elif not request.data.get('info_validation'):
            return JsonResponse({
                'error': 'Must provide `info_validation`'
                }, status=400)
        elif request.data.get('info_validation') not in ['valid', 'invalid']:
            return JsonResponse({
                'error': f"`{request.data['info_validation']}` is not a valid value for info_validation, must be either `valid` or `invalid`"
                }, status=400)
        
        return None


class BanProxyView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        error = self._get_request_errors(request)
        if error:
            return error

        try:
            proxy = models.Proxy.objects.get(ip=request.data['ip'])
        except models.Proxy.DoesNotExist:
            return JsonResponse({
                'error': 'Proxy with that IP does not exist'
                }, status=404)

        proxy.is_banned = True
        proxy.save()

        return JsonResponse({}, status=200)
        
    def _get_request_errors(self, request):
        if not request.data.get('ip'):
            return JsonResponse({
                'error': 'Must provide `ip`'
                }, status=400)
        
        return None

class TestFoundView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        error = self._get_request_errors(request)
        if error:
            return error

        try:
            user = models.User.objects.get(id=request.data['user_id'])
        except models.User.DoesNotExist:
            return JsonResponse({
                'error': f'user with id {request.data["user_id"]} does not exist'
            }, status=404)

        try:
            test_center = models.TestCenter.objects.get(id=request.data['test_center_id'])
        except models.TestCenter.DoesNotExist:
            return JsonResponse({
                'error': f'test center with id {request.data["test_center_id"]} does not exist'
            }, status=404)

        email_sender.test_found_email(
                user.email,
                user.profile.get_full_name(),
                request.data['test_time'],
                request.data['test_date'],
                test_center.name
        )

        return JsonResponse({}, status=200)

    def _get_request_errors(self, request):
        if not request.data.get('user_id'):
            return JsonResponse({
                'error': 'Must provide `user_id`'
                }, status=400)
        elif not request.data.get('test_center_id'):
            return JsonResponse({
                'error': 'Must provide `test_center_id`'
                }, status=400)
        elif not request.data.get('test_time'):
            return JsonResponse({
                'error': 'Must provide `test_time`'
                }, status=400)
        elif not request.data.get('test_date'):
            return JsonResponse({
                'error': 'Must provide `test_date`'
                }, status=400)

