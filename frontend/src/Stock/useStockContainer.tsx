import { History } from "history";

import useTxes from "./useTxes";
import useStockDetail from "./useStockDetail";
import useStockPage from "./useStockPage";

function useStockContainer(history: History) {
  const { handleTabChange, page } = useStockPage(history);
  const stockDetailState = useStockDetail();
  const txesState = useTxes();

  return {
    handleTabChange,
    page,
    txesState,
    stockDetailState
  };
}

export default useStockContainer;
