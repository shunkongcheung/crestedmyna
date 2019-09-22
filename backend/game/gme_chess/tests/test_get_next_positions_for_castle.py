from django.test import TestCase
from game.gme_chess.utils.prefixes import (
    CHS_EMPTY as EMP,
    CHS_CANNON as CAS,
)
from game.gme_chess.utils.get_next_positions_for_castle import (
    get_next_positions_for_castle
)


class ChessGetCastleNextPositionTestCase(TestCase):
    def test_get_castle_next_positions(self):
        UPC = CAS.upper()
        LOC = CAS.lower()
        board = [
            [EMP, EMP, EMP, EMP],
            [UPC, EMP, EMP, EMP],
            [UPC, EMP, LOC, EMP],
            [EMP, EMP, EMP, EMP],
            [UPC, EMP, EMP, EMP],
            [EMP, EMP, EMP, EMP],
        ]

        positions = get_next_positions_for_castle(board, (2, 0))
        expected = [(2, 1), (2, 2), (3, 0)]

        positions.sort()
        expected.sort()

        self.assertListEqual(positions, expected)
