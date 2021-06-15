import json
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.views import View
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from . import models, serializers
from django.db.utils import IntegrityError


class UserViewSet(viewsets.ModelViewSet):
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
    queryset = models.TestCenter.objects.all()
    serializer_class = serializers.TestCenterSerializer


class ProxyViewSet(viewsets.ModelViewSet):
    queryset = models.Proxy.objects.all()
    serializer_class = serializers.ProxySerializer


class ProxyCustomerPairView(View):
    def get(self, request):
        data = self.find_usable_pair()

        if not data:
            return JsonResponse({
                'error': 'There are no customers or proxies available'
                }, status=404)
        else:
            return JsonResponse(data)

    def find_usable_pair(self):
        customer = self.find_usable_customer()
        proxy = self.find_usable_proxy()

        if customer and proxy:
            customer.last_crawled = datetime.datetime.now()
            proxy.last_used = datetime.datetime.now()

            customer.save()
            proxy.save()

            return {
                    'customer': serializers.UserSerializer(customer).data,
                    'proxy': serializers.ProxySerializer(proxy).data
                    }
        else:
            return None


    def find_usable_customer(self):
        time_limit = datetime.datetime.now() - datetime.timedelta(minutes=1)
        usable_customer = models.User.objects.filter(
                last_crawled__lte=time_limit,
                info_validation='valid').order_by('last_crawled').first()

        return usable_customer

    def find_usable_proxy(self):
        time_limit = datetime.datetime.now() - datetime.timedelta(minutes=3)
        usable_proxy = models.Proxy.objects.order_by('last_used').filter(
                last_used__lte=time_limit,
                is_banned=False).first()

        return usable_proxy


def test_view(request):
    return HttpResponse('hello world')


@csrf_exempt
def add_available_date_view(request, test_center_name):
    if request.method != "POST":
        return HttpResponse(status=405)

    dates = json.loads(request.body).get('dates')
    print('@@@@@@@@@@@@', dates)
    if not dates:
        return HttpResponse(status=400)

    test_center = models.TestCenter.objects.filter(name=test_center_name).first()
    print(dates)

    for k in dates:
        y, m , d = k.split('-')
        date_model = models.AvailableDate(
                date=datetime.date(int(y), int(m), int(d)),
                test_center=test_center
                )

        date_model.save() 

        for time in dates[k]:
            dt = datetime.datetime.strptime(time, "%H:%M")
            time_model = models.AvailableTime(date=date_model, time=dt.time())
            time_model.save()


    return HttpResponse(status=201)

def customer_view(request, pk):
    customer = models.User.objects.filter(id=pk).first()

    time_ranges = []
    for each in customer.acceptable_time_ranges.all():
        time_ranges.append({
            'start_time': each.start_time,
            'end_time': each.end_time
            })
    
    dict_ = { 
            "driving_licence_number": customer.driving_licence_number,
            "test_ref": customer.test_ref,
            "main_test_center": customer.main_test_center.name,
            "earliest_test_date": customer.earliest_test_date,
            "latest_test_date": customer.latest_test_date,
            "time_ranges": time_ranges
            }

    return JsonResponse(dict_)


def get_user_view(request):
    return JsonResponse({'user': str(request.user)})


class UserProfileView(APIView):
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

        data = self._translate_request_data(request.data)
        #data, errors = self.validate_data(request.data)
#        if errors:
#            return JsonResponse({
#                'error': errors
#                }, status=400)
#
        
        self._update_profile(user, data)

        return JsonResponse({
            'message': 'User updated successfully'
            }, status=200)

    def _validate_data(self, data):
        pass

    def _update_profile(self, user, data):
        profile = models.Profile.objects.get(user=user)
        for attr in data:
            if hasattr(profile, attr):
                setattr(profile, attr, data[attr])
            else:
                raise KeyError(f'Profile has no attribute {attr}')
        
        profile.save()

    def _create_test_center(self, test_center_name):
        try:
            main_test_center =  models.TestCenter.objects.get(name=test_center_name)

        except models.TestCenter.DoesNotExist as e:
            main_test_center = models.TestCenter(name=test_center_name)
            main_test_center.save()
            
        return main_test_center

    def _translate_request_data(self, data):
        translated_data = {}

        for k in data:
            if data[k] == '':
                continue
            elif k == 'confirm_password':
                continue
            elif k == 'password':
                continue
            elif k == 'email':
                continue
            elif k == 'phone_number':
                translated_data['mobile_number'] = data[k]
            elif k == 'test_after':
                translated_data['earliest_test_date'] = data[k]
            elif k == 'test_before':
                translated_data['latest_test_date'] = data[k]
            elif k == 'desired_test_center':
                translated_data['main_test_center'] = self._create_test_center(data[k])
            else:
                translated_data[k] = data[k]

        return translated_data


class ChangeEmailView(APIView):
    def post(self, request):
        data = request.data
        user = request.user

        error = self.get_request_errors(request)
        if error:
            return error

        user.email = data.get('new_email')
        user.save()

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

        if not user.check_password(data.get('password', user.password)):
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
    def post(self, request):
        data = request.data
        user = request.user

        error = self.get_request_errors(request)
        if error:
            return error

        user.password = make_password(data.get('new_password'))
        user.save()

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

        if not user.check_password(data.get('current_password', user.password)):
            return JsonResponse({
                'error': "Wrong password",
                'code': 4
                }, status=401)

        return None


class LogoutView(APIView):
    def get(self, request):
        logout(request)

        return HttpResponse(status=200)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'user': str(user)})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
