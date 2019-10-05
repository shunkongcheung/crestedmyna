import { useCallback, useEffect, useMemo, useRef } from "react";

import useChartRange from "./useChartRange";
import useCCASSParticipantDetails from "./useCCASSParticipantDetails";
import useGetChartData from "./useGetChartData";
import useStockTrends from "./useStockTrends";
import useStockMaster from "./useStockMaster";
import useStockTxAdd from "./useStockTxAdd";
import useStockTxs from "./useStockTxs";
import useStockProfile from "./useStockProfile";

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
  const { stockProfileState, handleStockProfileChange } = useStockProfile();
  const { chartRange, setChartRange, getDatesFromRange } = useChartRange();

  const { range } = chartRange;
  const { stockMaster } = stockMasterState;

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
      if (nStockMaster)
        return Promise.all([
          fetchParticipantDetails(stockCode, startDate, endDate),
          fetchStockTrends(stockCode, startDate, endDate),
          fetchStockMasterNames()
        ]);
    },
    [
      createStockMaster,
      fetchParticipantDetails,
      fetchStockTrends,
      fetchStockMasterNames,
      getDatesFromRange,
      range
    ]
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

  const chartState = useMemo(
    () => {
      const isLoading =
        participantDetailsState.isLoading || stockTrendsState.isLoading;
      return {
        isLoading,
        ...chartRange,
        ...getChartData(
          chartRange.startDate,
          chartRange.endDate,
          participantDetailsState.detailSums,
          stockTrendsState.prices,
          participantDetailsState.participantDetailsMap
        ),
        handleRangeSelected
      };
    },
    [
      chartRange,
      getChartData,
      handleRangeSelected,
      participantDetailsState,
      stockTrendsState
    ]
  );
  const stockNameState = useMemo(
    () => ({
      isLoading:  stockMasterState.isLoading,
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
    () => ({
      handleDelete: handleDeleteStockMaster,
      stockCode: stockMaster.stockCode,
      shareCount: stockMaster.shareCount,
      marketPrice: stockMaster.marketPrice,
      marketValue: stockMaster.marketValue,
      realizedValue: stockMaster.realizedValue
    }),
    [handleDeleteStockMaster, stockMaster]
  );
  const stockTxTableState = useMemo(
    () => ({
      isTxsLoading: stockTxsState.isLoading,
      page: stockTxsState.page,
      stockTxs: stockTxsState.stockTxs
    }),
    [stockTxsState]
  );
  const txEditState = useMemo(
    () => ({
      isProfileLoading: stockProfileState.isLoading,
      handleAddTx,
      handleStockProfileChange,
      stockProfile: stockProfileState.stockProfile
    }),
    [handleAddTx, handleStockProfileChange, stockProfileState]
  );

  return {
    chartState,
    stockInfoState,
    stockNameState,
    stockTxTableState,
    txEditState
  };
}

export default useStockDetail;
