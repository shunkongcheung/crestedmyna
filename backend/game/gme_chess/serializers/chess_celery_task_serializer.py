from base.utils import get_celery_active_tasks
from game.models import ChessBoardCalculateMaster

from game.gme_chess.gen_chess_results import gen_chess_results
from game.gme_chess.retrigger_chess_results import retrigger_chess_results

from rest_framework.serializers import (
    ChoiceField,
    Serializer,
    IntegerField,
)


def clear_disabled_calculates():
    ChessBoardCalculateMaster.objects\
        .filter(enable=False)\
        .delete()


def get_celery_active_related_tasks():
    task_name = 'game.gme_chess.tasks.create_calculate_children_masters.create_calculate_children_masters'
    tasks = get_celery_active_tasks(task_name)
    return tasks


class ChessCeleryTaskSerializer(Serializer):
    active_task_count = IntegerField(read_only=True)
    disabled_calculate_master_count = IntegerField(read_only=True)
    enable_calculate_master_count = IntegerField(read_only=True)

    action = ChoiceField(
        choices=[
            ('gen_chess_results', 'generate chess results'),
            ('retrigger_chess_results', 'retrigger chess results'),
            ('clear_disabled_calculates', 'clear disabled calculates'),
            ('nothing', 'nothing'),
        ],
        default='nothing'
    )

    def validate(self, data):
        action = data['action']
        if action == 'gen_chess_results':
            gen_chess_results()
        if action == 'retrigger_chess_results':
            retrigger_chess_results()
        if action == 'clear_disabled_calculates':
            clear_disabled_results()

        related_tasks = get_celery_active_related_tasks()
        active_task_count = len(list(related_tasks))
        data['active_task_count'] = active_task_count

        data['disabled_calculate_master_count'] = \
            ChessBoardCalculateMaster.objects\
            .filter(enable=False)\
            .count()
        data['enable_calculate_master_count'] = \
            ChessBoardCalculateMaster.objects\
            .filter(enable=True)\
            .count()

        return data
