from base.utils import get_admin_user
from game.gme_chess.models import (
    ChessBoardCalculateMaster,
    ChessBoardResultMaster,
)
from game.gme_chess.serializers.chess_make_move_serializer import (
    create_calculate_master,
    get_move_request_master,
)
from game.gme_chess.utils import (
    get_board_from_hash,
    get_board_winner_and_score,
)
from game.gme_chess.utils.prefixes import CHS_EMPTY


def get_created_calculate_master(board_hash, top_level):
    board = get_board_from_hash(board_hash)
    winner, _ = get_board_winner_and_score(board)
    if winner != CHS_EMPTY:
        return f'has a winner {winner}', None

    exist_result_master = ChessBoardResultMaster.objects\
        .filter(from_board=board_hash, enable=True)\
        .first()

    if not exist_result_master is None:
        return f'Has result ({exist_result_master.id})', None

    exist_calculate_master = ChessBoardCalculateMaster.objects\
        .filter(board=board_hash, enable=True, level=top_level)\
        .first()

    if not exist_calculate_master is None:
        return f'Has calculate ({exist_calculate_master.id})', None

    move_request_master = get_move_request_master(board_hash, get_admin_user())
    calculate_master = create_calculate_master(move_request_master)
    create_msg = f'Created ({calculate_master.id})'
    return create_msg, calculate_master
