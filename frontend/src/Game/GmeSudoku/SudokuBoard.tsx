import React, { CSSProperties, memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import classNames from "./SudokuBoard.module.scss";

type TSudokuBoard = Array<Array<string>>;

interface ISudokuBoardProps {
  currentBoard: Array<Array<string>>;
  handleSudokuBoardChange: (f: (b: TSudokuBoard) => TSudokuBoard) => any;
  startBoard: Array<Array<string>>;
}

function SudokuBoard({
  currentBoard,
  handleSudokuBoardChange,
  startBoard
}: ISudokuBoardProps) {
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

  const renderCell = useCallback(
    (value, isFromStart, rowIdx, colIdx) => {
      if (isFromStart)
        return <span className={classNames.startValue}>{value}</span>;
      const onChange = ({ target: { value } }: { target: { value: any } }) =>
        handleCellChange(rowIdx, colIdx, value.toString());
      return (
        <input
          className={classNames.numInput}
          min={1}
          type="number"
          value={value}
          onChange={onChange}
        />
      );
    },
    [handleCellChange]
  );

  const renderRow = useCallback(
    (valueRow: Array<string>, startRow: Array<string>, rowIdx: number) => {
      return valueRow.map((value, colIdx) => {
        const key = `${rowIdx}-${colIdx}`;
        const style: CSSProperties = {};
        if ((rowIdx + 1) % 3 === 0) style.borderBottomWidth = 2;
        if ((colIdx + 1) % 3 === 0) style.borderRightWidth = 2;
        return (
          <div className={classNames.cell} key={key} style={style}>
            {renderCell(value, startRow[colIdx] !== "_", rowIdx, colIdx)}
          </div>
        );
      });
    },
    [renderCell]
  );

  const renderedBoard = useMemo(
    () => {
      return Array.from({ length: 9 }).map((_, rowIdx) => (
        <div className={classNames.row} key={"row-" + rowIdx}>
          {renderRow(currentBoard[rowIdx], startBoard[rowIdx], rowIdx)}
        </div>
      ));
    },
    [currentBoard, startBoard, renderRow]
  );

  return <div className={classNames.container}>{renderedBoard}</div>;
}

SudokuBoard.propTypes = {
  currentBoard: PropTypes.array.isRequired,
  handleSudokuBoardChange: PropTypes.func.isRequired,
  startBoard: PropTypes.array.isRequired
};
export default memo(SudokuBoard);
