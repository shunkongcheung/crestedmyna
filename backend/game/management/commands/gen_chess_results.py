# from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError


from game.gme_chess.gen_chess_results.gen_chess_results import gen_chess_results


class Command(BaseCommand):
    help = 'generate chess data'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        gen_chess_results()
