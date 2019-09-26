

def get_hash_from_board(board):
    hash_rows = [''.join(row) for row in board]
    return ''.join(hash_rows)
