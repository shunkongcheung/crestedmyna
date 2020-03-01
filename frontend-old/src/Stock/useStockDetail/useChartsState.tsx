import { useCallback, useMemo } from "react";

import useChartRange from "./useChartRange";
import useChartSummary from "./useChartSummary";
import useCCASSParticipantDetails from "./useCCASSParticipantDetails";
import useGetChartData from "./useGetChartData";
import useStockTrends from "./useStockTrends";

function useChartsState(stockCode: string) {
  const {
    fetchParticipantDetails,
    participantDetailsState
  } = useCCASSParticipantDetails();

  const { fetchStockTrends, stockTrendsState } = useStockTrends();

  const { chartRange, setChartRange, getDatesFromRange } = useChartRange();
  const { range } = chartRange;

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

  const { handleChartPointHover, ...chartSummaryState } = useChartSummary(
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
        fetchParticipantDetails(stockCode, startDate, endDate),
        fetchStockTrends(stockCode, startDate, endDate)
      ]);
    },
    [
      fetchParticipantDetails,
      fetchStockTrends,
      getDatesFromRange,
      setChartRange,
      stockCode
    ]
  );

  // return --------------------------------------------------
  const chartRangeState = useMemo(
    () => ({ ...chartRange, handleRangeSelected }),
    [chartRange, handleRangeSelected]
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

  return {
    chartRangeState,
    chartSummaryState,
    ccassChartState,
    fetchParticipantDetails,
    fetchStockTrends,
    getDatesFromRange,
    priceChartState,
    setChartRange,
    range,
    turnoverChartState
  };
}

export default useChartsState;
