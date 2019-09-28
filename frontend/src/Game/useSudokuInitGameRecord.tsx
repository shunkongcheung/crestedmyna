import { useCallback, useEffect } from "react";
import { useDetailState } from "../Base/Fetches";

type TDifficulity = "easy" | "medium" | "difficult";
type TInitializeState = "loading" | "empty" | "loaded";
type TSudokuBoard = Array<Array<string>>;

interface IRecordMaster {
  currentBoard: TSudokuBoard;
  difficulty: TDifficulity;
  isFetching: boolean;
  initializeState: TInitializeState;
  solutionBoard: TSudokuBoard;
  startBoard: TSudokuBoard;
  usedSecond: number;
}
interface IRecordMasterRet {
  current_board: string;
  difficulty: TDifficulity;
  solution_board: string;
  start_board: string;
  used_second: number;
}

function useSudokuInitGameRecord(setRecordMaster: (r: IRecordMaster) => any) {
  const { fetchDetail: fetchInitialRecordMaster } = useDetailState<
    IRecordMasterRet
  >();

  const getBoardFromHash = useCallback(boardHash => {
    const sideLen = Math.pow(boardHash.length, 0.5);
    const characters = boardHash.split("");
    const board: Array<Array<string>> = [];

    for (let rowIdx = 0; rowIdx < sideLen; rowIdx++) {
      const boardRow = characters.slice(
        rowIdx * sideLen,
        (rowIdx + 1) * sideLen
      );
      board.push(boardRow);
    }

    return board;
  }, []);
  const getInitializeState = useCallback(
    (boardHash: string): TInitializeState => {
      if (!boardHash) return "empty";
      const characters = boardHash.split("");
      for (let character of characters) {
        if (character !== "_") return "loaded";
      }
      return "empty";
    },
    []
  );

  const initializeRecordMaster = useCallback(
    async () => {
      const { ok, payload } = await fetchInitialRecordMaster(
        "game/gme_sudoku/game_record/"
      );
      if (!ok) return;
      const initializeState = getInitializeState(payload.current_board);
      const currentBoard = getBoardFromHash(payload.current_board);
      const startBoard = getBoardFromHash(payload.start_board);
      const solutionBoard = getBoardFromHash(payload.solution_board);
      setRecordMaster({
        currentBoard,
        difficulty: payload.difficulty,
        startBoard,
        solutionBoard,
        usedSecond: payload.used_second,
        initializeState,
        isFetching: false
      });
    },
    [
      fetchInitialRecordMaster,
      getBoardFromHash,
      getInitializeState,
      setRecordMaster
    ]
  );

  useEffect(
    () => {
      initializeRecordMaster();
    },
    [initializeRecordMaster]
  );
}

export default useSudokuInitGameRecord;
