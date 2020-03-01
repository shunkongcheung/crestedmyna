import React, { memo } from "react";

import styled from "styled-components";

import GameHeader from "./GameHeader";
import SudokuBoard from "./Board";
import useSudokuUtils from "./useSudokuUtils";

const Container = styled.div``;

interface SudokuProps {}

function Sudoku({}: SudokuProps) {
  const data = {
    startBoard:
      "___5____99_37_428_82613_7_5__185__9449____85___594712_247_93518__9_8_476__847___2",
    currentBoard:
      "___5____99_37_428_82613_7_5__185__9449____85___594712_247_93518__9_8_476__847___2"
  };
  const { getBoardFromHash } = useSudokuUtils();

  return (
    <>
      <GameHeader
        difficulty="easy"
        usedSecond={1}
        setGameStage={() => {}}
        handleSubmit={() => {}}
      />
      <SudokuBoard
        handleSudokuBoardChange={() => {}}
        startBoard={getBoardFromHash(data.startBoard)}
        currentBoard={getBoardFromHash(data.currentBoard)}
      />
    </>
  );
}

export default memo(Sudoku);
