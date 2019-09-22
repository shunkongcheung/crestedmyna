from django.test import TestCase
from game.gme_chess.utils.prefixes import (
    CHS_EMPTY as EM,
    CHS_CANNON as CA,
)
from game.gme_chess.utils.get_next_positions_for_cannon import (
    get_next_positions_for_cannon
)


class ChessGetCannonNextPositionTestCase(TestCase):
    def test_get_next_positions_for_cannon(self):
        UC = CA.upper()
        LC = CA.lower()
        board = [
            [EM, EM, EM, EM, EM],
            [UC, EM, EM, EM, EM],
            [UC, EM, LC, EM, UC],
            [EM, EM, EM, EM, EM],
            [UC, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM],
            [LC, EM, EM, EM, EM],
            [EM, EM, EM, EM, EM],
        ]

        positions = get_next_positions_for_cannon(board, (2, 0))
        expected = [(2, 1),  (3, 0), (6, 0)]

        positions.sort()
        expected.sort()

        self.assertListEqual(positions, expected)
