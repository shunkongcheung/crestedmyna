from __future__ import absolute_import, unicode_literals
from celery import shared_task


from game.models import (
    ChessBoardCalculateMaster,
    ChessBoardResultMaster,
    ChessMoveRequestMaster,
)
from general.gnl_syslog.utils import write_syslog
from random import randint


@shared_task
def update_calculate_master_with_best_score(calculate_master_id,
                                            is_debug=False,
                                            is_random=True
                                            ):
    calculate_master = ChessBoardCalculateMaster.objects.get(
        id=calculate_master_id
    )
    is_upper_side = calculate_master.is_upper_side

    def w_debug(message):
        if not is_debug:
            return
        name = 'update_calculate_master_with_best_score'
        level, user = calculate_master.level, calculate_master.created_by
        message = f'{calculate_master.id}({level})[{is_upper_side}]:' +\
            f' {message}. [{calculate_master.board}]'
        return write_syslog(name, message, user)

    # if i am calculated return~
    if calculate_master.is_calculated:
        w_debug(f'calculated')
        return

    # check is all children calculated
    calculated_children_count = calculate_master.children\
        .filter(is_calculated=True)\
        .count()
    children_count = calculate_master.children.count()
    if children_count > calculated_children_count:
        w_debug(f'not finished {children_count} {calculated_children_count}')
        return

    # get worst score of children and flip the negative sign as my score
    children_scores = [
        child_calculate_master.score
        for child_calculate_master in calculate_master.children.all()
    ]
    best_score = get_best_score(children_scores, is_upper_side)
    w_debug(f'best_score: {best_score}')

    # storing result
    calculate_master.score = best_score
    calculate_master.is_calculated = True
    calculate_master.save()

    # triggering upper level to run the same
    if calculate_master.parent:
        parent_id = calculate_master.parent.id
        w_debug(f'trigger parent: {parent_id}')
        update_calculate_master_with_best_score\
            .apply_async((parent_id, is_debug,))
        return

    # no parent. i am root.
    w_debug(f'i am root')
    all_children = calculate_master.children.all()
    desired_children = get_desired_children(all_children, best_score)
    desired_board = get_desired_board(desired_children, is_random)

    update_request_master(calculate_master.move_request_master, desired_board)
    create_result_master(calculate_master, desired_children)
    if not is_debug:
        disable_calculate_masters(calculate_master.move_request_master)
    w_debug(f'finished')


def create_result_master(calculate_master, desired_children):
    to_boards = [desired_child.board for desired_child in desired_children]
    obj, created = ChessBoardResultMaster.objects.update_or_create(
        name=calculate_master.board,
        from_board=calculate_master.board,
        to_boards=to_boards,
        created_by=calculate_master.created_by
    )
    return obj


def get_best_score(scores, is_upper_side):
    return max(scores) if is_upper_side else min(scores)


def disable_calculate_masters(request_master):
    request_master.board_calculate_masters.all().update(enable=False)


def get_desired_children(children_masters, best_score):
    desire_children = children_masters.filter(score=best_score)
    return desire_children


def get_desired_board(desire_children, is_random):
    desire_count = desire_children.count()
    desire_index = randint(0, desire_count - 1) if is_random else 0
    return desire_children[desire_index].board


def update_request_master(request_master, desired_board):
    request_master.to_board = desired_board
    request_master.save()
