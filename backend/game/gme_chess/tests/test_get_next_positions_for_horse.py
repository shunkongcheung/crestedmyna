from django.test import TestCase
from game.gme_chess.utils.prefixes import (
    CHS_EMPTY as EM,
    CHS_HORSE as HO,
)
from game.gme_chess.utils.get_next_positions_for_horse import (
    get_next_positions_for_horse
)


class ChessGetHorseNextPositionTestCase(TestCase):
    def get_test_board(self):
        UH = HO.upper()
        LH = HO.lower()
        return [
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [UH, EM, EM, EM, EM, EM, EM, EM, EM],
            [UH, EM, LH, EM, EM, EM, EM, EM, EM],
            [EM, LH, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],

            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM, EM, EM, EM, EM],
        ]

    def test_get_next_positions_for_horse_lower(self):
        board = self.get_test_board()

        positions = get_next_positions_for_horse(board, (3, 1))
        expected = [(1, 0), (1, 2), (2, 3), (4, 3), (5, 2), (5, 0)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)

    def test_get_next_positions_for_horse_upper(self):
        board = self.get_test_board()

        positions = get_next_positions_for_horse(board, (1, 0))
        expected = [(0, 2), (2, 2)]

        positions.sort()
        expected.sort()
        self.assertListEqual(positions, expected)
