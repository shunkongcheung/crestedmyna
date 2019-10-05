import { History } from "history";

import useStockTx from "./useStockTx";
import useStockDetail from "./useStockDetail";
import useStockPage from "./useStockPage";

function useStockContainer(history: History) {
  const { handleTabChange, page } = useStockPage(history);
  const stockDetailState = useStockDetail();
  const stockTxState = useStockTx();

  return {
    handleTabChange,
    page,
    stockDetailState,
    stockTxState
  };
}

export default useStockContainer;
