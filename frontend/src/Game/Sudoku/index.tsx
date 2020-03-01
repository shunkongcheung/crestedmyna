import React, { memo } from "react";
import { Spin } from "antd";

import GameHeader from "./GameHeader";
import SudokuBoard from "./Board";
import useSudoku from "./useSudoku";

import { Center } from "../../components";

function Sudoku() {
  const {
    gameStage,
    startBoard,
    currentBoard,
    setGameStage,
    handleSubmit,
    handleSudokuBoardChange,
    loading,
    usedSecond
  } = useSudoku();

  if (loading)
    return (
      <Center>
        <Spin />
      </Center>
    );

  if (gameStage === "paused") return <div>choose</div>;
  return (
    <>
      <GameHeader
        difficulty={"easy"}
        usedSecond={usedSecond}
        setGameStage={setGameStage}
        handleSubmit={handleSubmit}
      />
      <SudokuBoard
        handleSudokuBoardChange={handleSudokuBoardChange}
        startBoard={startBoard}
        currentBoard={currentBoard}
      />
    </>
  );
}

export default memo(Sudoku);
