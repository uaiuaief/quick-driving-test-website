from django.core.management.base import BaseCommand, CommandError
from api.models import Proxy


class Command(BaseCommand):
    help = 'Unban all proxies'

    def handle(self, *args, **options):
        proxies = Proxy.objects.all()
        for each in proxies:
            each.is_banned = False
            each.save()




