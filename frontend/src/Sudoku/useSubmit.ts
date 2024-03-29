import { useCallback } from "react";
import { notification } from "antd";
import { useFetchEdit } from "react-accessories";

type GameStage = "playing" | "paused";

interface BoardItem {
  id: number;
  currentBoard: string;
  usedSecond: number;
}

interface CurState {
  currentBoard: string;
  gameStage: GameStage;
  loading: boolean;
}

interface SubmitRet {
  completed: boolean;
}

type SetCurState<T extends CurState> = (s: (o: T) => T) => any;

function useSubmit<T extends CurState>(setCurState: SetCurState<T>) {
  const fetchEdit = useFetchEdit<SubmitRet>();

  const handleSubmit = useCallback(
    async (data: BoardItem) => {
      const { currentBoard } = data;
      if (currentBoard.includes("_"))
        return notification.error({
          message: "Invalid",
          description: "Board is not completed"
        });
      const ret = await fetchEdit(`/sudoku/${data.id}`, {
        data,
        method: "PUT"
      });
      if (!ret) return;

      const { completed } = ret;
      if (!completed)
        return notification.error({
          message: "Invalid",
          description: "Board is invalid"
        });

      notification.info({
        message: "Congratz",
        description: "You have completed the challenge"
      });
      setCurState(o => ({ ...o, currentBoard: "", gameStage: "paused" }));
    },
    [fetchEdit, setCurState]
  );
  return { handleSubmit };
}

export default useSubmit;
