import { useCallback, useEffect, useMemo } from "react";
import { History } from "history";

import { useStockSectors, useStockSearch } from "../hooks";

import useChartsState from "./useChartsState";
import useStockAlert from "./useStockAlert";
import useStockMaster from "./useStockMaster";
import useStockNews from "./useStockNews";
import useStockNotice from "./useStockNotice";
import useStockTxAdd from "./useStockTxAdd";
import useStockTxs from "./useStockTxs";
import useInitStockMaster from "./useInitStockMaster";

function useStockDetail(
  fetchStockMasterNames: () => any,
  history: History,
  refreshOtherTabs: () => any,
  stockMasterNames: Array<{ name: string; id: number }>
) {
  const {
    deleteStockMaster,
    stockMasterState,
    fetchStockMaster
  } = useStockMaster();
  const { deleteStockTx, fetchStockTxs, stockTxsState } = useStockTxs();

  const { stockMaster } = stockMasterState;
  const stockSectorState = useStockSectors(stockMaster);
  const stockAlert = useStockAlert(stockMaster.stockCode);
  const stockNews = useStockNews(stockMaster.stockCode);
  const { isLoading: isSearchLoading, handleStockSearch } = useStockSearch(
    history,
    refreshOtherTabs
  );
  const stockNotice = useStockNotice(stockMaster.stockCode);

  const {
    fetchParticipantDetails,
    fetchStockTrends,
    getDatesFromRange,
    range,
    setChartRange,
    ...chartsState
  } = useChartsState(stockMaster.stockCode);

  const onStockTxChange = useCallback(
    (sm: number, page: number) => {
      fetchStockTxs(sm, page);
      refreshOtherTabs();
    },
    [fetchStockTxs, refreshOtherTabs]
  );
  const txEditState = useStockTxAdd(
    stockMaster.id,
    onStockTxChange,
    fetchStockMaster
  );

  useInitStockMaster(
    fetchStockMaster,
    fetchParticipantDetails,
    fetchStockTrends,
    fetchStockTxs,
    getDatesFromRange,
    history,
    setChartRange
  );

  // refresh on every minute -------------------------------
  useEffect(
    () => {
      // const unsubscribe = setInterval(() => {
      //   fetchStockMaster(stockMaster.id);
      //   refreshOtherTabs();
      // }, 1000 * 60);

      // return () => {
      //   clearInterval(unsubscribe);
      // };
    },
    [fetchStockMaster, stockMaster.id, refreshOtherTabs]
  );

  // methods ------------------------------------------------
  const handleTxTableChange = useCallback(
    (page: number) => fetchStockTxs(stockMaster.id, page),
    [fetchStockTxs, stockMaster]
  );
  const handleDeleteTx = useCallback(
    async (id: number) => {
      const { ok } = await deleteStockTx(id);
      if (!ok) return;
      onStockTxChange(stockMaster.id, 1);
    },
    [deleteStockTx, onStockTxChange, stockMaster.id]
  );

  const handleDeleteStockMaster = useCallback(
    async () => {
      const ok = await deleteStockMaster();
      if (!ok) return ok;
      refreshOtherTabs();
      history.push("/stock/portfolio");
      return ok;
    },
    [deleteStockMaster, history, refreshOtherTabs]
  );

  const handleStockMasterChange = useCallback(
    (id: number) => history.push(`/stock/detail/${id}`),
    [history]
  );

  // return --------------------------------------------------

  const stockCtrlState = useMemo(
    () => ({ ...stockAlert, handleDelete: handleDeleteStockMaster }),
    [handleDeleteStockMaster, stockAlert]
  );
  const stockInfoState = useMemo(
    () => ({ ...stockMaster, ...stockSectorState }),
    [stockMaster, stockSectorState]
  );
  const stockTxTableState = useMemo(
    () => ({
      handleDeleteTx,
      handleListChange: handleTxTableChange,
      ...stockTxsState
    }),
    [handleDeleteTx, handleTxTableChange, stockTxsState]
  );
  const stockNameState = useMemo(
    () => ({
      handleStockSearch,
      handleStockMasterChange,
      isLoading: isSearchLoading,
      stockMasterNames: stockMasterNames,
      stockName: stockMaster.name
    }),
    [
      handleStockMasterChange,
      handleStockSearch,
      isSearchLoading,
      stockMaster.name,
      stockMasterNames
    ]
  );
  const stockNewsState = useMemo(
    () => ({
      isLoading: stockNews.isLoading || stockNotice.isLoading,
      stockNews: stockNews.stockNews,
      notices: stockNotice.notices,
      substantialShareholders: stockNotice.substantialShareholders
    }),
    [stockNews, stockNotice]
  );

  return {
    ...chartsState,
    stockCtrlState,
    stockInfoState,
    stockNameState,
    stockNewsState,
    stockTxTableState,
    txEditState
  };
}

export default useStockDetail;
