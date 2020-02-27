import { Entity, Column } from "typeorm";

import Base from "./Base";

const BOARD_SIZE = Math.pow(9, 2);
const defaultBoard = Array.from({ length: BOARD_SIZE })
  .map(() => "_")
  .join("");

const boardArg = { length: BOARD_SIZE, default: defaultBoard };

@Entity()
class SudokuBoard extends Base {
  @Column(boardArg)
  startBoard: string;

  @Column(boardArg)
  solutionBoard: string;

  @Column(boardArg)
  currentBoard: string;

  @Column({ default: 0 })
  usedSecond: number;

  @Column()
  difficulity: "easy" | "medium" | "difficulty";
}

export default SudokuBoard;
