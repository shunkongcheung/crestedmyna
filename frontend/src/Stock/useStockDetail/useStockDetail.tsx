import { useCallback, useEffect, useMemo, useRef } from "react";

import { useStockSectors } from "../hooks";

import useChartRange from "./useChartRange";
import useChartSummary from "./useChartSummary";
import useCCASSParticipantDetails from "./useCCASSParticipantDetails";
import useGetChartData from "./useGetChartData";
import useStockAlert from "./useStockAlert";
import useStockMaster from "./useStockMaster";
import useStockNews from "./useStockNews";
import useStockTrends from "./useStockTrends";
import useStockTxAdd from "./useStockTxAdd";
import useStockTxs from "./useStockTxs";

function useStockDetail(
  fetchStockMasterNames: () => any,
  refreshOtherTabs: () => any,
  stockMasterNames: Array<{ id: number; name: string }>
) {
  const isInitialzed = useRef(false);
  const { fetchStockTrends, stockTrendsState } = useStockTrends();
  const {
    fetchParticipantDetails,
    participantDetailsState
  } = useCCASSParticipantDetails();
  const {
    createStockMaster,
    deleteStockMaster,
    stockMasterState,
    fetchStockMaster
  } = useStockMaster();
  const { fetchStockTxs, stockTxsState } = useStockTxs();
  const { chartRange, setChartRange, getDatesFromRange } = useChartRange();

  const { range } = chartRange;
  const { stockMaster } = stockMasterState;
  const stockSectorState = useStockSectors(stockMaster);
  const stockAlert = useStockAlert(stockMaster.stockCode);
  const stockNewsState = useStockNews(stockMaster.stockCode);

  const onStockTxAdd = useCallback(
    (sm: number, page: number) => {
      fetchStockTxs(sm, page);
      refreshOtherTabs();
    },
    [fetchStockTxs, refreshOtherTabs]
  );
  const { handleAddTx } = useStockTxAdd(
    stockMaster.id,
    onStockTxAdd,
    fetchStockMaster
  );
  const { getChartData } = useGetChartData();
  const chartData = useMemo(
    () => {
      return getChartData(
        chartRange.startDate,
        chartRange.endDate,
        participantDetailsState.detailSums,
        stockTrendsState.trends,
        participantDetailsState.participantDetailsMap
      );
    },
    [chartRange, getChartData, participantDetailsState, stockTrendsState]
  );

  const { handleChartPointHover, ...chartSummary } = useChartSummary(
    chartData.labels,
    chartData.detailSums,
    chartData.prices,
    chartData.turnovers
  );

  // methods ------------------------------------------------
  const handleRangeSelected = useCallback(
    range => {
      setChartRange(range);
      const { startDate, endDate } = getDatesFromRange(range);
      return Promise.all([
        fetchParticipantDetails(stockMaster.stockCode, startDate, endDate),
        fetchStockTrends(stockMaster.stockCode, startDate, endDate)
      ]);
    },
    [
      fetchParticipantDetails,
      fetchStockTrends,
      getDatesFromRange,
      setChartRange,
      stockMaster
    ]
  );

  const handleStockMasterChange = useCallback(
    async stockMasterId => {
      const stockMaster = await fetchStockMaster(stockMasterId);
      if (!stockMaster) return;
      const { startDate, endDate } = getDatesFromRange(range);
      return Promise.all([
        fetchParticipantDetails(stockMaster.stockCode, startDate, endDate),
        fetchStockTrends(stockMaster.stockCode, startDate, endDate),
        fetchStockTxs(stockMaster.id, 1)
      ]);
    },
    [
      fetchParticipantDetails,
      fetchStockMaster,
      fetchStockTrends,
      fetchStockTxs,
      getDatesFromRange,
      range
    ]
  );
  const handleStockSearch = useCallback(
    async stockCode => {
      const nStockMaster = await createStockMaster(stockCode);
      const { startDate, endDate } = getDatesFromRange(range);
      if (!nStockMaster) return;
      return Promise.all([
        fetchStockMasterNames(),
        fetchParticipantDetails(stockCode, startDate, endDate),
        fetchStockTrends(stockCode, startDate, endDate),
        fetchStockTxs(nStockMaster.id, 1)
      ]);
    },
    [
      createStockMaster,
      fetchStockMasterNames,
      fetchParticipantDetails,
      fetchStockTrends,
      fetchStockTxs,
      getDatesFromRange,
      range
    ]
  );
  const handleTxTableChange = useCallback(
    (page: number) => fetchStockTxs(stockMaster.id, page),
    [fetchStockTxs, stockMaster]
  );

  const initStockMaster = useCallback(
    async stockMasterId => {
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
      if (ok) {
        const secondStockMasterId =
          Array.isArray(stockMasterNames) && stockMasterNames.length > 1
            ? (stockMasterNames.find(itm => itm.id !== stockMaster.id) as any)
                .id
            : -1;
        fetchStockMasterNames();
        refreshOtherTabs();
        initStockMaster(secondStockMasterId);
      }
      return ok;
    },
    [
      deleteStockMaster,
      fetchStockMasterNames,
      refreshOtherTabs,
      initStockMaster,
      stockMasterNames,
      stockMaster
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
  const chartRangeState = useMemo(
    () => ({ ...chartRange, handleRangeSelected }),
    [chartRange, handleRangeSelected]
  );

  const chartSummaryState = useMemo(
    () => ({ ...chartSummary, stockName: stockMaster.name }),
    [chartSummary, stockMaster.name]
  );

  const ccassChartState = useMemo(
    () => ({
      handleChartPointHover,
      isLoading: participantDetailsState.isLoading,
      labels: chartData.labels,
      detailSums: chartData.detailSums,
      participantDetailsMap: chartData.participantDetailsMap
    }),
    [chartData, handleChartPointHover, participantDetailsState]
  );
  const priceChartState = useMemo(
    () => ({
      handleChartPointHover,
      isLoading: stockTrendsState.isLoading,
      labels: chartData.labels,
      prices: chartData.prices
    }),
    [chartData, handleChartPointHover, stockTrendsState]
  );
  const turnoverChartState = useMemo(
    () => ({
      handleChartPointHover,
      isLoading: stockTrendsState.isLoading,
      labels: chartData.labels,
      turnovers: chartData.turnovers
    }),
    [chartData, handleChartPointHover, stockTrendsState]
  );

  const stockCtrlState = useMemo(
    () => ({ ...stockAlert, handleDelete: handleDeleteStockMaster }),
    [handleDeleteStockMaster, stockAlert]
  );
  const stockNameState = useMemo(
    () => ({
      isLoading: stockMasterState.isLoading,
      stockName: stockMaster.name,
      stockMasterNames: stockMasterNames,
      handleStockMasterChange,
      handleStockSearch
    }),
    [
      handleStockMasterChange,
      handleStockSearch,
      stockMaster,
      stockMasterState.isLoading,
      stockMasterNames
    ]
  );
  const stockInfoState = useMemo(
    () => ({ ...stockMaster, ...stockSectorState }),
    [stockMaster, stockSectorState]
  );
  const stockTxTableState = useMemo(
    () => ({ handleListChange: handleTxTableChange, ...stockTxsState }),
    [handleTxTableChange, stockTxsState]
  );
  const txEditState = useMemo(
    () => ({
      handleAddTx
    }),
    [handleAddTx]
  );

  return {
    ccassChartState,
    chartRangeState,
    chartSummaryState,
    priceChartState,
    stockCtrlState,
    stockInfoState,
    stockNewsState,
    stockNameState,
    stockTxTableState,
    turnoverChartState,
    txEditState
  };
}

export default useStockDetail;
