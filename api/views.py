import json
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from . import models, serializers
from django.db.utils import IntegrityError


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

    def create_customer(self, data):
        main_test_center = self.create_test_center(data)

        driving_licence_number = data.get('driving_licence_number')
        test_ref = data.get('test_ref')
        theory_test_number = data.get('theory_test_number')
        email = data.get('email')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        mobile_number = data.get('mobile_number')
        earliest_test_date  = data.get('test_after')
        latest_test_date  = data.get('test_before')
        mobile_number = data.get('mobile_number')

        new_customer = models.Customer(
                driving_licence_number=driving_licence_number,
                test_ref=test_ref,
                theory_test_number=theory_test_number,
                main_test_center=main_test_center,
                email=email,
                first_name=first_name,
                last_name=last_name,
                mobile_number=mobile_number,
                earliest_test_date=earliest_test_date,
                latest_test_date=latest_test_date
        )

        new_customer.save()
        
        self.create_acceptable_time_range(new_customer, data)

        return new_customer

    def create_test_center(self, data):
        desired_test_center = data.get('desired_test_center')
        test_center =  models.TestCenter.objects.filter(name=desired_test_center).first()

        if test_center:
            main_test_center = test_center
        else:
            main_test_center = models.TestCenter(name=desired_test_center)
            main_test_center.save()

        return main_test_center


    def create_acceptable_time_range(self, customer, data):
        earliest_time = data.get('earliest_time')
        latest_time = data.get('latest_time')

        time_range = models.AcceptableTimeRange(
                customer=customer,
                start_time=earliest_time,
                end_time=latest_time
        )

        time_range.save()

    def create(self, request):
        try:
            new_customer = self.create_customer(request.data)
        except IntegrityError as e:
            return JsonResponse({"error": str(e)}, status=400)

        return HttpResponse(status=201)

        


class TestCenterViewSet(viewsets.ModelViewSet):
    queryset = models.TestCenter.objects.all()
    serializer_class = serializers.TestCenterSerializer


class TimeRangeViewSet(viewsets.ModelViewSet):
    queryset = models.AcceptableTimeRange.objects.all()
    serializer_class = serializers.TimeRangeSerializer


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
                    'customer': serializers.CustomerSerializer(customer).data,
                    'proxy': serializers.ProxySerializer(proxy).data
                    }
        else:
            return None


    def find_usable_customer(self):
        time_limit = datetime.datetime.now() - datetime.timedelta(minutes=1)
        usable_customer = models.Customer.objects.filter(
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
    customer = models.Customer.objects.filter(id=pk).first()

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
