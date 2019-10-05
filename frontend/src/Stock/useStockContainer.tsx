import { History } from "history";

import useStockTx from "./useStockTx";
import useStockDetail from "./useStockDetail";
import useStockPage from "./useStockPage";
import useStockPortfolio from "./useStockPortfolio";

function useStockContainer(history: History) {
  const { handleTabChange, page } = useStockPage(history);
  const stockDetailState = useStockDetail();
  const stockPortfolioState = useStockPortfolio();
  const stockTxState = useStockTx();

  return {
    handleTabChange,
    page,
    stockDetailState,
    stockPortfolioState,
    stockTxState
  };
}

export default useStockContainer;
