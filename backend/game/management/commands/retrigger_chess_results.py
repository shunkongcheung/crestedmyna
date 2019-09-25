from django.core.management.base import BaseCommand, CommandError
from game.gme_chess.retrigger_chess_results import retrigger_chess_results


class Command(BaseCommand):
    help = 'retrigger generate chess if stopped'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        retrigger_chess_results()
