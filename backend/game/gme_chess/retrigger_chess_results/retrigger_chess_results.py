from base.utils import get_admin_user
from general.gnl_syslog.utils import write_syslog
from game.gme_chess.tasks import create_calculate_children_masters
from game.gme_chess.tasks.update_calculate_master_with_best_score import (
    update_calculate_master_with_best_score
)

from .get_calculate_masters_without_children import get_calculate_masters_without_children
from .get_calculate_masters_with_children import get_calculate_masters_with_children


def retrigger_chess_results():
    with_children = get_calculate_masters_without_children()
    without_children = get_calculate_masters_with_children()
    with_count, without_count = len(with_children), len(without_children)
    total = with_count + without_count

    write_debug(f'with/without {with_count}+{without_count} = {total}')

    for idx, calculate_master in enumerate(with_children):
        create_calculate_children_masters\
            .apply_async((calculate_master.id,))

    for idx, calculate_master in enumerate(without_children):
        update_calculate_master_with_best_score\
            .apply_async((calculate_master.id,))


def write_debug(message):
    print(f'{message}')
    write_syslog('retrigger_chess_results', message, get_admin_user())
