from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Customer


def test_view(request):
    return HttpResponse('hello world')

def customer_view(request, pk):
    customer = Customer.objects.filter(id=pk).first()

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
