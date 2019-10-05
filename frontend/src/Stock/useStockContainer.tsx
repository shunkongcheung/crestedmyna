import { useMemo } from "react";
import { History } from "history";

import useStockTx from "./useStockTx";
import useStockDetail from "./useStockDetail";
import useStockMasterNames from "./useStockMasterNames";
import useStockPage from "./useStockPage";
import useStockPortfolio from "./useStockPortfolio";

function useStockContainer(history: History) {
  const { handleTabChange, page } = useStockPage(history);
  const {
    fetchStockMasterNames,
    ...stockMasterNamesState
  } = useStockMasterNames();
  const stockDetailState = useStockDetail();
  const stockPortfolioState = useStockPortfolio();
  const stockTxStateI = useStockTx();

  const stockTxState = useMemo(
    () => {
      const isLoading =
        stockTxStateI.isLoading || stockMasterNamesState.isLoading;
      return { ...stockTxStateI, ...stockMasterNamesState, isLoading };
    },
    [stockTxStateI, stockMasterNamesState]
  );

  return {
    handleTabChange,
    page,
    stockDetailState,
    stockPortfolioState,
    stockTxState
  };
}

export default useStockContainer;
