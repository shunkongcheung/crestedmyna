from django.test import TestCase
from game.gme_chess.utils.prefixes import (
    CHS_EMPTY as EM,
    CHS_KNIGHT as KN,
)
from game.gme_chess.utils.get_next_positions_for_knight import (
    get_next_positions_for_knight
)


class ChessGetKnightNextPositionTestCase(TestCase):
    def get_test_board(self):
        UK = KN.upper()
        LK = KN.lower()
        return [
            [EM, EM, EM, EM, LK, EM, EM, EM, EM],
            [EM, EM, EM, UK, LK, EM, EM, EM, EM],
            [EM, EM, EM, UK, UK, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],

            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, LK, LK, EM, EM, EM],
            [EM, EM, EM, EM, UK, LK, EM, EM, EM],
            [EM, EM, EM, EM, UK, EM, EM, EM, EM],
        ]

    def test_get_next_positions_for_knight_lower(self):
        board = self.get_test_board()

        positions = get_next_positions_for_knight(board, (8, 5))
        expected = [(9, 4)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_knight_upper(self):
        board = self.get_test_board()

        positions = get_next_positions_for_knight(board, (1, 3))
        expected = [(0, 4)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)
