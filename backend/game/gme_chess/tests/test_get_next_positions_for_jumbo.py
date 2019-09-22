from django.test import TestCase
from game.gme_chess.utils.prefixes import (
    CHS_EMPTY as EM,
    CHS_JUMBO as JU,
)
from game.gme_chess.utils.get_next_positions_for_jumbo import (
    get_next_positions_for_jumbo
)


class ChessGetJumboNextPositionTestCase(TestCase):
    def get_test_board(self):
        UJ = JU.upper()
        LJ = JU.lower()
        return [
            [EM, UJ, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, LJ, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, UJ, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],

            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, LJ, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, UJ, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, LJ, EM],
        ]

    def test_get_next_positions_for_jumbo_lower1(self):
        board = self.get_test_board()

        positions = get_next_positions_for_jumbo(board, (6, 2))
        expected = [(8, 0), (8, 4)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_jumbo_lower2(self):
        board = self.get_test_board()

        positions = get_next_positions_for_jumbo(board, (9, 8))
        expected = [(7, 6)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_jumbo_upper1(self):
        board = self.get_test_board()

        positions = get_next_positions_for_jumbo(board, (3, 6))
        expected = [(1, 4), (1, 8)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_jumbo_upper2(self):
        board = self.get_test_board()

        positions = get_next_positions_for_jumbo(board, (0, 1))
        expected = [(2, 3)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)
