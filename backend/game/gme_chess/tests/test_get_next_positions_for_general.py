from django.test import TestCase
from game.gme_chess.utils.prefixes import (
    CHS_EMPTY as EM,
    CHS_GENERAL as GE,
    CHS_GENERAL as GE,
)
from game.gme_chess.utils.get_next_positions_for_general import (
    get_next_positions_for_general
)


class ChessGetGeneralNextPositionTestCase(TestCase):
    def get_test_board(self):
        UG = GE.upper()
        LG = GE.lower()
        return [
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, UG, LG, EM, EM, EM, EM],
            [EM, EM, EM, UG, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],

            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, LG, EM, EM, EM],
            [EM, EM, EM, EM, UG, LG, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
        ]

    def test_fly_general(self):
        UG = GE.upper()
        LG = GE.lower()
        board = [
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, UG, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],

            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, LG, EM, EM, EM, EM, EM],
        ]
        positions = get_next_positions_for_general(board, (2, 3))
        self.assertTrue((9, 3)in positions)

        positions = get_next_positions_for_general(board, (9, 3))
        self.assertTrue((2, 3)in positions)

    def test_get_next_positions_for_general_lower1(self):
        board = self.get_test_board()

        positions = get_next_positions_for_general(board, (8, 5))
        expected = [(8, 4), (9, 5)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_general_lower2(self):
        board = self.get_test_board()

        positions = get_next_positions_for_general(board, (7, 5))
        expected = [(7, 4)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_general_upper1(self):
        board = self.get_test_board()

        positions = get_next_positions_for_general(board, (1, 3))
        expected = [(0, 3), (1, 4)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_general_upper2(self):
        board = self.get_test_board()

        positions = get_next_positions_for_general(board, (2, 3))
        expected = [(2, 4)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)
