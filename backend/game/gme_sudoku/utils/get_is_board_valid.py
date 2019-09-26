def get_is_area_unique(board, start_column, start_row, ignore_empty):
    area_values = []
    for column_idx in range(start_column, 3):
        for row_idx in range(start_row, 3):
            cur_item = board[row_idx][column_idx]
            if cur_item == '' and ignore_empty:
                continue
            if cur_item in area_values:
                return False
            area_values.append(cur_item)
    return True


def get_is_row_unique(board, row_idx, ignore_empty):
    row_values = []
    for column_idx in range(0, 9):
        cur_item = board[row_idx][column_idx]
        if cur_item == '' and ignore_empty:
            continue
        if cur_item in row_values:
            return False
        row_values.append(cur_item)
    return True


def get_is_column_unique(board, column_idx, ignore_empty):
    row_values = []
    for row_idx in range(0, 9):
        cur_item = board[row_idx][column_idx]
        if cur_item == '' and ignore_empty:
            continue
        if cur_item in row_values:
            return False
        row_values.append(cur_item)
    return True


def get_is_board_valid(board, ignore_empty=False):
    for row_idx in range(0, 9, 3):
        for column_idx in range(0, 9, 3):
            if not get_is_area_unique(board, row_idx, column_idx, ignore_empty):
                return False

    for row_idx in range(0, 9):
        if not get_is_row_unique(board, row_idx, ignore_empty):
            return False

    for column_idx in range(0, 9):
        if not get_is_column_unique(board, column_idx, ignore_empty):
            return False

    return True
