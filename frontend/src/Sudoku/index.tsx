import React, { memo, useMemo } from "react";
import { Spin } from "antd";

import Choose from "./Choose";
import GameHeader from "./GameHeader";
import SudokuBoard from "./Board";
import useSudoku from "./useSudoku";

import { Center, Layout } from "../components";

function Sudoku() {
  const {
    gameStage,
    startBoard,
    currentBoard,
    setGameStage,
    handleSubmit,
    handleLvlSelect,
    handleSudokuBoardChange,
    loading,
    usedSecond
  } = useSudoku();

  const content = useMemo(() => {
    if (loading)
      return (
        <Center>
          <Spin />
        </Center>
      );

    if (gameStage === "paused")
      return (
        <Choose
          handleDifficultySelect={handleLvlSelect}
          handleContinue={
            currentBoard.length ? () => setGameStage("continue") : undefined
          }
        />
      );

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
  }, [
    currentBoard,
    gameStage,
    handleLvlSelect,
    handleSubmit,
    handleSudokuBoardChange,
    loading,
    setGameStage,
    startBoard,
    usedSecond
  ]);

  return <Layout>{content}</Layout>;
}

export default memo(Sudoku);
