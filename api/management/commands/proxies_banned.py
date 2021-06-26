from django.core.management.base import BaseCommand, CommandError
from api.models import Proxy


class Command(BaseCommand):
    help = 'Shows how many proxies are banned'

    def handle(self, *args, **options):
        proxies = Proxy.objects.filter(is_banned=True)
        self.stdout.write(f"Proxies banned: {len(proxies)}")




