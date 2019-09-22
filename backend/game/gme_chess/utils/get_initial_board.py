from .prefixes import (
    CHS_EMPTY as EMY,
    CHS_CANNON as CN,
    CHS_CASTLE as CE,
    CHS_GENERAL as GL,
    CHS_HORSE as HE,
    CHS_JUMBO as JO,
    CHS_KNIGHT as KT,
    CHS_SOLDIER as SR,
)


def get_initial_board():
    CNU, CNL = CN.upper(), CN.lower()
    CEU, CEL = CE.upper(), CE.lower()
    GLU, GLL = GL.upper(), GL.lower()
    HEU, HEL = HE.upper(), HE.lower()
    JOU, JOL = JO.upper(), JO.lower()
    KTU, KTL = KT.upper(), KT.lower()
    SRU, SRL = SR.upper(), SR.lower()
    return [
        [CEU, HEU, JOU, KTU, GLU, KTU, JOU, HEU, CEU],
        [EMY, EMY, EMY, EMY, EMY, EMY, EMY, EMY, EMY],
        [EMY, CNU, EMY, EMY, EMY, EMY, EMY, CNU, EMY],
        [SRU, EMY, SRU, EMY, SRU, EMY, SRU, EMY, SRU],
        [EMY, EMY, EMY, EMY, EMY, EMY, EMY, EMY, EMY],

        [EMY, EMY, EMY, EMY, EMY, EMY, EMY, EMY, EMY],
        [SRL, EMY, SRL, EMY, SRL, EMY, SRL, EMY, SRL],
        [EMY, CNL, EMY, EMY, EMY, EMY, EMY, CNL, EMY],
        [EMY, EMY, EMY, EMY, EMY, EMY, EMY, EMY, EMY],
        [CEL, HEL, JOL, KTL, GLL, KTL, JOL, HEL, CEL],
    ]
