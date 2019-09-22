from django.test import TestCase
from game.gme_chess.utils.prefixes import (
    CHS_EMPTY as EM,
    CHS_SOLDIER as SO,
)
from game.gme_chess.utils.get_next_positions_for_soldier import (
    get_next_positions_for_soldier
)


class ChessGetSoldierNextPositionTestCase(TestCase):
    def get_test_board(self):
        US = SO.upper()
        LS = SO.lower()
        return [
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, US, LS, EM, EM, EM, EM],

            [EM, EM, EM, LS, US, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
        ]

    def test_get_next_positions_for_soldier_upper1(self):
        board = self.get_test_board()

        positions = get_next_positions_for_soldier(board, (5, 4))
        expected = [(5, 3), (5, 5), (6, 4)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_soldier_upper2(self):
        board = self.get_test_board()

        positions = get_next_positions_for_soldier(board, (4, 3))
        expected = [(5, 3)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_soldier_lower1(self):
        board = self.get_test_board()

        positions = get_next_positions_for_soldier(board, (4, 4))
        expected = [(4, 3), (4, 5), (3, 4)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_soldier_lower2(self):
        board = self.get_test_board()

        positions = get_next_positions_for_soldier(board, (5, 3))
        expected = [(4, 3)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)
