import { useCallback, useEffect, useMemo, useRef } from "react";
import { History } from "history";

import { useStockSectors } from "../hooks";

import useChartsState from "./useChartsState";
import useStockAlert from "./useStockAlert";
import useStockMaster from "./useStockMaster";
import useStockNews from "./useStockNews";
import useStockTxAdd from "./useStockTxAdd";
import useStockTxs from "./useStockTxs";

function useStockDetail(
  fetchStockMasterNames: () => any,
  history: History,
  refreshOtherTabs: () => any,
  stockMasterNames: Array<{ id: number; name: string }>
) {
  const isInitialzed = useRef(false);
  const {
    /* createStockMaster, */
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

  // methods ------------------------------------------------

  /*   const handleStockMasterChange = useCallback( */
  /*     async stockMasterId => { */
  /*       const stockMaster = await fetchStockMaster(stockMasterId); */
  /*       if (!stockMaster) return; */
  /*       const { startDate, endDate } = getDatesFromRange(range); */
  /*       return Promise.all([ */
  /*         fetchParticipantDetails(stockMaster.stockCode, startDate, endDate), */
  /*         fetchStockTrends(stockMaster.stockCode, startDate, endDate), */
  /*         fetchStockTxs(stockMaster.id, 1) */
  /*       ]); */
  /*     }, */
  /*     [ */
  /*       fetchParticipantDetails, */
  /*       fetchStockMaster, */
  /*       fetchStockTrends, */
  /*       fetchStockTxs, */
  /*       getDatesFromRange, */
  /*       range */
  /*     ] */
  /*   ); */
  /*   const handleStockSearch = useCallback( */
  /*     async stockCode => { */
  /*       const nStockMaster = await createStockMaster(stockCode); */
  /*       const { startDate, endDate } = getDatesFromRange(range); */
  /*       if (!nStockMaster) return; */
  /*       return Promise.all([ */
  /*         fetchStockMasterNames(), */
  /*         fetchParticipantDetails(stockCode, startDate, endDate), */
  /*         fetchStockTrends(stockCode, startDate, endDate), */
  /*         fetchStockTxs(nStockMaster.id, 1) */
  /*       ]); */
  /*     }, */
  /*     [ */
  /*       createStockMaster, */
  /*       fetchStockMasterNames, */
  /*       fetchParticipantDetails, */
  /*       fetchStockTrends, */
  /*       fetchStockTxs, */
  /*       getDatesFromRange, */
  /*       range */
  /*     ] */
  /*   ); */
  const handleTxTableChange = useCallback(
    (page: number) => fetchStockTxs(stockMaster.id, page),
    [fetchStockTxs, stockMaster]
  );

  const initStockMaster = useCallback(
    async (stockMasterId: number) => {
      const nStockMaster = await fetchStockMaster(stockMasterId);
      if (!nStockMaster) return;
      const { startDate, endDate } = getDatesFromRange("week");
      setChartRange("week");
      return Promise.all([
        fetchParticipantDetails(nStockMaster.stockCode, startDate, endDate),
        fetchStockTrends(nStockMaster.stockCode, startDate, endDate),
        fetchStockTxs(nStockMaster.id, 1)
      ]);
    },
    [
      fetchParticipantDetails,
      fetchStockMaster,
      fetchStockTrends,
      fetchStockTxs,
      getDatesFromRange,
      setChartRange
    ]
  );

  const handleDeleteStockMaster = useCallback(
    async () => {
      const ok = await deleteStockMaster();
      if (!ok) return ok;
      refreshOtherTabs();
      history.push("/stock/portfolio");
      return ok;
      /* if (ok) { */
      /*   const secondStockMasterId = */
      /*     Array.isArray(stockMasterNames) && stockMasterNames.length > 1 */
      /*       ? (stockMasterNames.find(itm => itm.id !== stockMaster.id) as any) */
      /*           .id */
      /*       : -1; */
      /*   fetchStockMasterNames(); */
      /*   refreshOtherTabs(); */
      /*   initStockMaster(secondStockMasterId); */
      /* } */
      /* return ok; */
    },
    [
      deleteStockMaster,
      history,
      /* fetchStockMasterNames, */
      refreshOtherTabs
      /* initStockMaster, */
      /* stockMasterNames, */
      /* stockMaster */
    ]
  );

  // lice cycle ------------------------------------------------
  useEffect(
    () => {
      if (!Array.isArray(stockMasterNames) || !stockMasterNames.length) return;
      if (stockMaster.id > 0) return;
      if (isInitialzed.current) return;
      isInitialzed.current = true;
      const firstStockMaster = stockMasterNames[0];
      initStockMaster(firstStockMaster.id);
    },
    [stockMasterNames, stockMaster.id, initStockMaster]
  );

  // return --------------------------------------------------

  const stockCtrlState = useMemo(
    () => ({ ...stockAlert, handleDelete: handleDeleteStockMaster }),
    [handleDeleteStockMaster, stockAlert]
  );
  /* const stockNameState = useMemo( */
  /*   () => ({ */
  /*     isLoading: stockMasterState.isLoading, */
  /*     stockName: stockMaster.name, */
  /*     stockMasterNames: stockMasterNames, */
  /*     handleStockMasterChange, */
  /*     handleStockSearch */
  /*   }), */
  /*   [ */
  /*     handleStockMasterChange, */
  /*     handleStockSearch, */
  /*     stockMaster, */
  /*     stockMasterState.isLoading, */
  /*     stockMasterNames */
  /*   ] */
  /* ); */
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
    /* stockNameState, */
    stockTxTableState,
    txEditState
  };
}

export default useStockDetail;
