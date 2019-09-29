def get_board_from_hash(board_hash):
    chars = list(board_hash)
    return [chars[i*9:(i+1)*9] for i in range(9)]
