import requests
import stripe

#r = requests.patch('http://localhost:8000/api/customers/6/', json={"info_validation": "unchecked"})
#print(r.json())

stripe.api_key = "sk_test_51J2l6tB7wZYk7wVwTmkRKLa5ubXj8cOJ9z6zK9imc0UL1lbHJPqfF3jxe0HNB0IxLDQhyHtsLXZ3QP4ylvXscok7003E6xawWH"


res = stripe.PaymentIntent.create(
        amount=1000,
        currency='brl',
        payment_method_types=['card'],
        receipt_email='jenny.rosen@example.com',
        )



print(res)
