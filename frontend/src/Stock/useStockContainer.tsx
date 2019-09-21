import { useCallback, useEffect, useMemo } from "react";

import useStockPrices from "./useStockPrices";
import useStockMasters from "./useStockMasters";

function useStockContainer() {
  const { fetchStockPrices, stockPricesState } = useStockPrices();
  const { stockMastersState } = useStockMasters();

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

  return { priceLineChartState, stockMastersState };
}

export default useStockContainer;
