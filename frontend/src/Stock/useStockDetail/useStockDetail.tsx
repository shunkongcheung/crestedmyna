import { useCallback, useEffect, useMemo, useRef } from "react";
import { History } from "history";

import { useStockSectors } from "../hooks";

import useChartsState from "./useChartsState";
import useStockAlert from "./useStockAlert";
import useStockMaster from "./useStockMaster";
import useStockNews from "./useStockNews";
import useStockTxAdd from "./useStockTxAdd";
import useStockTxs from "./useStockTxs";
import useInitStockMaster from "./useInitStockMaster";

function useStockDetail(
  fetchStockMasterNames: () => any,
  history: History,
  refreshOtherTabs: () => any
) {
  const {
    deleteStockMaster,
    stockMasterState,
    fetchStockMaster
  } = useStockMaster();
  const { fetchStockTxs, stockTxsState } = useStockTxs();

  const { stockMaster } = stockMasterState;
  const stockSectorState = useStockSectors(stockMaster);
  const stockAlert = useStockAlert(stockMaster.stockCode);
  const stockNewsState = useStockNews(stockMaster.stockCode);

  const {
    fetchParticipantDetails,
    fetchStockTrends,
    getDatesFromRange,
    range,
    setChartRange,
    ...chartsState
  } = useChartsState(stockMaster.stockCode);

  const onStockTxAdd = useCallback(
    (sm: number, page: number) => {
      fetchStockTxs(sm, page);
      refreshOtherTabs();
    },
    [fetchStockTxs, refreshOtherTabs]
  );
  const txEditState = useStockTxAdd(
    stockMaster.id,
    onStockTxAdd,
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

  // methods ------------------------------------------------
  const handleTxTableChange = useCallback(
    (page: number) => fetchStockTxs(stockMaster.id, page),
    [fetchStockTxs, stockMaster]
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
    () => ({ handleListChange: handleTxTableChange, ...stockTxsState }),
    [handleTxTableChange, stockTxsState]
  );

  return {
    ...chartsState,
    stockCtrlState,
    stockInfoState,
    stockNewsState,
    stockTxTableState,
    txEditState
  };
}

export default useStockDetail;
