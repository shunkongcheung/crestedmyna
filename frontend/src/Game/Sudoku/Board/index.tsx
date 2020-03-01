import React, { memo, useCallback, useMemo } from "react";
import styled from "styled-components";

import BoardCell from "./Cell";

type Board = Array<Array<string>>;

interface IBoardProps {
  currentBoard: Array<Array<string>>;
  handleSudokuBoardChange: (f: (b: Board) => Board) => any;
  startBoard: Array<Array<string>>;
}

const Container = styled.div`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

const Row = styled.div`
  display: flex;
  @media (min-width: ${({ theme }) => theme.size.medium}) {
    height: 3rem;
  }

  @media (min-width: ${({ theme }) => theme.size.small}) {
    height: 2.5rem;
  }
  height: 2rem;
`;

function Board({
  currentBoard,
  handleSudokuBoardChange,
  startBoard
}: IBoardProps) {
  const handleCellChange = useCallback(
    (rowIdx, colIdx, value) => {
      handleSudokuBoardChange(oBoard => {
        const nBoard = JSON.parse(JSON.stringify(oBoard));
        nBoard[rowIdx][colIdx] = value;
        return nBoard;
      });
    },
    [handleSudokuBoardChange]
  );

  const renderRow = useCallback(
    (valueRow: Array<string>, startRow: Array<string>, rowIdx: number) =>
      valueRow.map((value, colIdx) => (
        <BoardCell
          rowIdx={rowIdx}
          colIdx={colIdx}
          handleCellChange={handleCellChange}
          key={`${rowIdx}-${colIdx}`}
          isFromStart={startRow[colIdx] !== "_"}
          value={value}
        />
      )),
    [handleCellChange]
  );

  const renderedBoard = useMemo(() => {
    return Array.from({ length: 9 }).map((_, rowIdx) => (
      <Row key={"row-" + rowIdx}>
        {renderRow(currentBoard[rowIdx], startBoard[rowIdx], rowIdx)}
      </Row>
    ));
  }, [currentBoard, startBoard, renderRow]);

  return <Container>{renderedBoard}</Container>;
}

export default memo(Board);
