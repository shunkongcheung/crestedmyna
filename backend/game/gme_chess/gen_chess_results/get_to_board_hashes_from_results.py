from game.models import ChessBoardResultMaster


def get_to_board_hashes_from_results():
    board_hashes = []
    result_masters = ChessBoardResultMaster.objects.all()
    for result_master in result_masters:
        board_hashes += result_master.to_boards

    return board_hashes
