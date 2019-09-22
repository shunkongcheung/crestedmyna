

def get_is_position_in_bound(position, left=0, top=0, width=9, height=10):
    if position[1] < left or position[1] >= (left+width):
        return False
    if position[0] < (top) or position[0] >= (top+height):
        return False
    return True
