import requests
from django.utils import timezone
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from api.models import Proxy
import email_sender


class Command(BaseCommand):
    help = 'Sends email to site admin with twocaptcha current balance'

    def handle(self, *args, **options):
        API_KEY = settings.TWOCAPTCHA_API_KEY
        URL = f"http://2captcha.com/res.php?key={API_KEY}&action=getbalance"
        ALI_EMAIL = settings.ALI_EMAIL

        r = requests.get(URL)

        balance = r.text
        now = format(timezone.now(), "%d/%m/%Y, %H:%M")

        body = f"Hello Ali Omar, \n\nYour current 2captcha balance is \n\n${balance}\n\nChecked on {now}"

        email_sender.send_simple_email(ALI_EMAIL, '2captcha balance', body)




