import { body } from "express-validator";

import getController from "../../getController";
import { SudokuBoard } from "../../../entities";
import getRandomBoard from "./getRandomBoard";
import { Request } from "express";

type Board = Array<Array<string>>;

type Difficulty = "easy" | "medium" | "difficult";

interface CreateData {
  difficulty: Difficulty;
}

interface UpdateData {
  currentBoard: string;
  usedSecond: number;
}

const createValidator = [
  body("difficulty").isIn(["easy", "medium", "difficult"])
];

const updateValidator = [
  body("currentBoard").isString(),
  body("usedSecond").isNumeric()
];

async function filterEntities(
  model: typeof SudokuBoard,
  paginateParams: object
) {
  const entities = await model.find(paginateParams);
  return entities.map((entity: SudokuBoard) => {
    const retData = { ...entity };
    delete retData.solutionBoard;
    return retData;
  });
}

async function getEntity(model: typeof SudokuBoard, req: Request) {
  const entity = await model.findOne({ id: Number(req.params.id) });
  if (!entity) return entity;

  const retData = { ...entity };
  delete retData.solutionBoard;
  return retData;
}

function getRemoveCount(difficulty: Difficulty) {
  const base = (Math.floor(Math.random() * 10) / 10) * 5;
  if (difficulty == "easy") return base + 30;
  if (difficulty == "medium") return base + 35;
  if (difficulty == "difficult") return base + 40;
}

function removeSpotsInBoard(board: Board, difficulty: Difficulty) {
  const removeCount = getRemoveCount(difficulty);
  let count = 0;
  while (count < removeCount) {
    const rowIdx = Math.floor(Math.random() * 9);
    const colIdx = Math.floor(Math.random() * 9);
    if (board[rowIdx][colIdx] === "_") continue;
    board[rowIdx][colIdx] = "_";
    count++;
  }
}

async function transformCreateData({ difficulty }: CreateData) {
  const board = getRandomBoard();
  const solutionBoard = board
    .map((row: Array<string>) => row.join(""))
    .join("");

  removeSpotsInBoard(board, difficulty);
  const boardStr = board.map((row: Array<string>) => row.join("")).join("");

  const tData: SudokuBoard = {
    startBoard: boardStr,
    solutionBoard,
    currentBoard: boardStr,
    usedSecond: 0,
    difficulty
  } as SudokuBoard;

  const retData = { ...tData };
  delete retData.solutionBoard;
  return [tData, retData];
}

async function transformUpdateData(data: UpdateData, entity: SudokuBoard) {
  const retData = { ...entity, ...data };
  delete retData.solutionBoard;
  return [data, retData];
}

const controller = getController({
  allowedMethods: ["list", "retrieve", "create", "update"],
  getEntity,
  filterEntities,
  model: SudokuBoard,
  validations: { create: createValidator, update: updateValidator },
  transformCreateData,
  transformUpdateData
});

export default controller;
