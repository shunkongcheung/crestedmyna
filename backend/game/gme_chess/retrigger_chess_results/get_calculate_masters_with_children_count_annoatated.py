
from django.db.models import Count
from game.models import ChessBoardCalculateMaster


def get_calculate_masters_with_children_count_annoatated():
    return ChessBoardCalculateMaster.objects\
        .annotate(children_count=Count('children'))\
        .filter(enable=True)\
        .exclude(level=0)
