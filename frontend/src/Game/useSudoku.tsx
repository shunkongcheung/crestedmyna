import { useCallback, useEffect, useState } from "react";
import { useDetailState, useEditState } from "../Base/Fetches";

type TInitializeState = "loading" | "empty" | "loaded";
type TDifficulity = "easy" | "medium" | "difficult";

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

interface IFetchInitBoardSubmit {
  difficulty: TDifficulity;
}
interface IFetchInitBoardRet {
  start_board: string;
  solution_board: string;
}

type TGameStage = "playing" | "paused";

function useSudoku() {
  const getInitBoard = useCallback(() => {
    return [
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
    ];
  }, []);

  // state --------------------------------------------------------
  const [gameStage, setGameStage] = useState<TGameStage>("paused");
  const [recordMaster, setRecordMaster] = useState<IRecordMaster>({
    startBoard: getInitBoard(),
    difficulty: "easy",
    solutionBoard: getInitBoard(),
    currentBoard: getInitBoard(),
    usedSecond: 0,
    initializeState: "loading",
    isFetching: true
  });

  const { fetchEdit: fetchInitialBoard } = useEditState<
    IFetchInitBoardRet,
    IFetchInitBoardSubmit
  >();
  const { fetchDetail: fetchInitialRecordMaster } = useDetailState<
    IRecordMasterRet
  >();

  // methods --------------------------------------------------------
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

  const handleSudokuBoardChange = useCallback(func => {
    setRecordMaster(oMaster => {
      const currentBoard = func(oMaster.currentBoard);
      return { ...oMaster, currentBoard };
    });
  }, []);

  const handleDifficultyChosen = useCallback(
    async (difficulty: TDifficulity) => {
      setRecordMaster(oMaster => ({ ...oMaster, isFetching: true }));
      const { ok, payload } = await fetchInitialBoard(
        "game/gme_sudoku/initial_board/",
        { difficulty }
      );
      if (!ok) return;
      const startBoard = getBoardFromHash(payload.start_board);
      const solutionBoard = getBoardFromHash(payload.solution_board);
      setRecordMaster(oMaster => ({
        ...oMaster,
        currentBoard: startBoard,
        difficulty,
        startBoard,
        solutionBoard,
        usedSecond: 0,
        isFetching: false
      }));
      setGameStage("playing");
    },
    [fetchInitialBoard, getBoardFromHash]
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
    [fetchInitialRecordMaster, getBoardFromHash, getInitializeState]
  );

  const updateUsedSecond = useCallback(
    () => {
      if (gameStage === "paused") return;
      setRecordMaster(oMaster => {
        if (oMaster.initializeState === "loading") return oMaster;
        if (oMaster.isFetching) return oMaster;
        return { ...oMaster, usedSecond: oMaster.usedSecond + 1 };
      });
    },
    [gameStage]
  );

  // effect ------------------------------------------------------------
  useEffect(
    () => {
      initializeRecordMaster();
    },
    [initializeRecordMaster]
  );

  useEffect(() => {
    const task = setInterval(updateUsedSecond, 1000);
    return () => {
      clearInterval(task);
    };
  });

  return {
    gameStage,
    handleDifficultyChosen,
    handleSudokuBoardChange,
    recordMaster,
    setGameStage
  };
}

export default useSudoku;
