from .get_calculate_masters_with_children_count_annoatated import (
    get_calculate_masters_with_children_count_annoatated
)


def get_calculate_masters_without_children():
    calculate_masters = get_calculate_masters_with_children_count_annoatated()
    return calculate_masters.exclude(children_count=0)
