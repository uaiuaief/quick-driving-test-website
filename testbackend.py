import requests

r = requests.patch('http://localhost:8000/api/customers/6/', json={"info_validation": "unchecked"})
print(r.json())

