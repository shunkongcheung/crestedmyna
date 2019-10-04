import { History } from "history";

import useStockDetail from "./useStockDetail";
import useStockPage from "./useStockPage";

function useStockContainer(history: History) {
  const { handleTabChange, page } = useStockPage(history);
  const stockDetailState = useStockDetail();

  return {
    handleTabChange,
    page,
    stockDetailState
  };
}

export default useStockContainer;
