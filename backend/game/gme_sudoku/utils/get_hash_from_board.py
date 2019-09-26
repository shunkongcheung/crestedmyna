

def get_hash_from_board(board):
    hash_rows = [''.join([str(col) for col in row]) for row in board]
    return ''.join(hash_rows)
