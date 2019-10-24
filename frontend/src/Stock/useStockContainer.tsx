import { useCallback, useMemo } from "react";
import { History } from "history";

import useCCASSTrend from "./useCCASSTrend";
import useStockTx from "./useStockTx";
import useStockDetail from "./useStockDetail";
import useStockMasterNames from "./useStockMasterNames";
import useStockPage from "./useStockPage";
import useStockPortfolio from "./useStockPortfolio";

function useStockContainer(history: History) {
  const { handleTabChange: handleTabChangeI, page } = useStockPage(history);
  const ccassTrendState = useCCASSTrend();
  const {
    fetchStockMasterNames,
    ...stockMasterNamesState
  } = useStockMasterNames();
  const stockTxStateI = useStockTx();
  const { refreshStockPortfolio, ...stockPortfolioState } = useStockPortfolio(
    history
  );
  const { stockMasterNames } = stockMasterNamesState;

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
    stockMasterNames
  );

  const stockDetailId = useMemo(
    () => {
      if (!stockDetailState || !stockDetailState.stockInfoState) return;
      return stockDetailState.stockInfoState.id || -1;
    },
    [stockDetailState]
  );

  const isDetailClickable = useMemo(
    () => {
      if (stockDetailId !== -1) return true;
      if (Array.isArray(stockMasterNames) && stockMasterNames.length)
        return true;
      return false;
    },
    [stockDetailId, stockMasterNames]
  );

  const handleStockDetailTabClick = useCallback(
    () => {
      if (stockDetailId !== -1) history.push(`/stock/detail/${stockDetailId}`);
      if (!isDetailClickable) return;
      const firstStockId = stockMasterNames[0].id;
      history.push(`/stock/detail/${firstStockId}`);
    },
    [history,isDetailClickable, stockDetailId]
  );

  const handleTabChange = useCallback(
    (pageName: string) => {
      return pageName === "detail"
        ? handleStockDetailTabClick()
        : handleTabChangeI(pageName);
    },
    [handleStockDetailTabClick, handleTabChangeI]
  );

  const stockTxState = useMemo(
    () => ({ ...stockMasterNamesState, ...stockTxStateI }),
    [stockTxStateI, stockMasterNamesState]
  );

  return {
    handleTabChange,
    handleStockDetailTabClick,
isDetailClickable,
    page,
    ccassTrendState,
    stockDetailState,
    stockPortfolioState,
    stockTxState
  };
}

export default useStockContainer;
