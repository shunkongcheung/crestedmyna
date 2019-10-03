import { useCallback, useEffect, useMemo } from "react";

import useChartRange from "./useChartRange";
import useCCASSParticipantDetails from "./useCCASSParticipantDetails";
import useGetChartData from "./useGetChartData";
import useStockPrices from "./useStockPrices";
import useStockMaster from "./useStockMaster";
import useStockMasters from "./useStockMasters";
import useStockTxAdd from "./useStockTxAdd";
import useStockTxs from "./useStockTxs";
import useStockProfile from "./useStockProfile";

function useStockContainer() {
  const { fetchStockPrices, stockPricesState } = useStockPrices();
  const {
    fetchParticipantDetails,
    participantDetailsState
  } = useCCASSParticipantDetails();
  const {
    createStockMaster,
    stockMasterState,
    fetchStockMaster
  } = useStockMaster();
  const { fetchStockTxs, stockTxsState } = useStockTxs();
  const { stockProfileState, handleStockProfileChange } = useStockProfile();
  const { chartRange, setChartRange, getDatesFromRange } = useChartRange();

  const { stockMastersState } = useStockMasters();
  const { stockMasters } = stockMastersState;
  const { stockMaster } = stockMasterState;

  const { handleAddTx } = useStockTxAdd(
    stockMaster.id,
    fetchStockTxs,
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
        fetchStockPrices(stockMaster.stockCode, startDate, endDate)
      ]);
    },
    [
      fetchParticipantDetails,
      fetchStockPrices,
      getDatesFromRange,
      setChartRange,
      stockMaster
    ]
  );

  const handleStockMasterChange = useCallback(
    async stockMasterId => {
      const stockMaster = await fetchStockMaster(stockMasterId);
      if (!stockMaster) return;
      const { startDate, endDate } = getDatesFromRange("week");
      return Promise.all([
        fetchParticipantDetails(stockMaster.stockCode, startDate, endDate),
        fetchStockPrices(stockMaster.stockCode, startDate, endDate),
        fetchStockTxs(stockMaster.id, 1)
      ]);
    },
    [
      fetchParticipantDetails,
      fetchStockMaster,
      fetchStockPrices,
      fetchStockTxs,
      getDatesFromRange
    ]
  );
  const handleStockSearch = useCallback(
    async stockCode => {
      const nStockMaster = await createStockMaster(stockCode);
      const { startDate, endDate } = getDatesFromRange("week");
      if (nStockMaster)
        return Promise.all([
          fetchParticipantDetails(stockCode, startDate, endDate),
          fetchStockPrices(stockCode, startDate, endDate)
        ]);
    },
    [
      createStockMaster,
      fetchParticipantDetails,
      fetchStockPrices,
      getDatesFromRange
    ]
  );

  const initStockMaster = useCallback(
    async () => {
      if (!Array.isArray(stockMasters) || !stockMasters.length) return;
      if (stockMaster.id > 0) return;
      const firstStockMaster = stockMasters[0];
      const nStockMaster = await fetchStockMaster(firstStockMaster.id);
      if (!nStockMaster) return;
      const { startDate, endDate } = getDatesFromRange("week");
      setChartRange("week");
      return Promise.all([
        fetchParticipantDetails(nStockMaster.stockCode, startDate, endDate),
        fetchStockPrices(nStockMaster.stockCode, startDate, endDate),
        fetchStockTxs(nStockMaster.id, 1)
      ]);
    },
    [
      fetchParticipantDetails,
      fetchStockMaster,
      fetchStockPrices,
      fetchStockTxs,
      getDatesFromRange,
      setChartRange,
      stockMasters,
      stockMaster
    ]
  );

  // lice cycle ------------------------------------------------
  useEffect(
    () => {
      initStockMaster();
    },
    [initStockMaster]
  );

  // return --------------------------------------------------

  const chartState = useMemo(
    () => {
      const isLoading =
        participantDetailsState.isLoading || stockPricesState.isLoading;
      return {
        isLoading,
        ...chartRange,
        ...getChartData(
          chartRange.startDate,
          chartRange.endDate,
          participantDetailsState.detailSums,
          stockPricesState.prices,
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
      stockPricesState
    ]
  );
  const stockNameState = useMemo(
    () => ({
      isLoading: stockMastersState.isLoading || stockMasterState.isLoading,
      stockName: stockMaster.name,
      stockMasters: stockMasters,
      handleStockMasterChange,
      handleStockSearch
    }),
    [
      handleStockMasterChange,
      handleStockSearch,
      stockMaster,
      stockMasterState.isLoading,
      stockMastersState.isLoading,
      stockMasters
    ]
  );
  const stockInfoState = useMemo(
    () => ({
      stockCode: stockMaster.stockCode,
      shareCount: stockMaster.shareCount,
      marketPrice: stockMaster.marketPrice,
      marketValue: stockMaster.marketValue,
      realizedValue: stockMaster.realizedValue
    }),
    [stockMaster]
  );
  const stockTxTableState = useMemo(
    () => ({
      isTxsLoading: stockTxsState.isLoading,
      isProfileLoading: stockProfileState.isLoading,
      page: stockTxsState.page,
      stockTxs: stockTxsState.stockTxs,
      handleAddTx,
      handleStockProfileChange,
      stockProfile: stockProfileState.stockProfile
    }),
    [handleAddTx, handleStockProfileChange, stockTxsState, stockProfileState]
  );

  return {
    chartState,
    stockInfoState,
    stockNameState,
    stockTxTableState
  };
}

export default useStockContainer;
