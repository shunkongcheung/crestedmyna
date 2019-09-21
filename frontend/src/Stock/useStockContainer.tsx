import { useCallback, useEffect, useMemo } from "react";
import useStockPrices from "./useStockPrices";

function useStockContainer() {
  const { fetchStockPrices, stockPricesState } = useStockPrices();

  useEffect(
    () => {
      fetchStockPrices("00001", "5years");
    },
    [fetchStockPrices]
  );

  console.log(stockPricesState);

  const handleRangeSelected = useCallback(
    range => fetchStockPrices("00001", range),
    [fetchStockPrices]
  );

  const priceLineChartState = useMemo(
    () => ({
      ...stockPricesState,
      handleRangeSelected
    }),
    [stockPricesState, handleRangeSelected]
  );

  return { priceLineChartState };
}

export default useStockContainer;
