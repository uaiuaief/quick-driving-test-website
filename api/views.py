import json
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
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
            return JsonResponse({"error": {
                "email": "An user with that email already exists"
                }}, status=400)

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


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)

        if user:
            login(request, user)
            return JsonResponse({'user': str(user)})
        else:
            return JsonResponse({'error': 'user does not exist'}, status=401)
