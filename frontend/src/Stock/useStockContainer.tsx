import { useCallback, useMemo } from "react";
import { History } from "history";

import useCCASSTrend from "./useCCASSTrend";
import useStockTx from "./useStockTx";
import useStockDetail from "./useStockDetail";
import useStockMasterNames from "./useStockMasterNames";
import useStockPage from "./useStockPage";
import useStockPortfolio from "./useStockPortfolio";

function useStockContainer(history: History) {
  const { handleTabChange, page } = useStockPage(history);
  const ccassTrendState = useCCASSTrend();
  const {
    fetchStockMasterNames,
    ...stockMasterNamesState
  } = useStockMasterNames();
  const stockTxStateI = useStockTx();
  const { refreshStockPortfolio, ...stockPortfolioState } = useStockPortfolio();

  const { handleListChange } = stockTxStateI;
  const refreshOtherTabs = useCallback(
    () => {
      handleListChange(1, {});
      refreshStockPortfolio();
    },
    [handleListChange, refreshStockPortfolio]
  );

  const stockDetailState = useStockDetail(
    fetchStockMasterNames,
    history,
    refreshOtherTabs,
  );

  const stockTxState = useMemo(
    () => ({ ...stockMasterNamesState, ...stockTxStateI }),
    [stockTxStateI, stockMasterNamesState]
  );

  return {
    handleTabChange,
    page,
    ccassTrendState,
    stockDetailState,
    stockPortfolioState,
    stockTxState
  };
}

export default useStockContainer;
