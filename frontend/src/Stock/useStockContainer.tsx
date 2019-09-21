import { useCallback, useEffect, useMemo } from "react";

import useStockPrices from "./useStockPrices";
import useStockMaster from "./useStockMaster";
import useStockMasters from "./useStockMasters";

function useStockContainer() {
  const { fetchStockPrices, stockPricesState } = useStockPrices();
  const {
    createStockMaster,
    stockMasterState,
    fetchStockMaster
  } = useStockMaster();
  const { stockMastersState } = useStockMasters();
  const { stockMasters } = stockMastersState;
  const { stockMaster } = stockMasterState;

  // methods ------------------------------------------------
  const handleRangeSelected = useCallback(
    range => fetchStockPrices(stockMaster.stockCode, range),
    [fetchStockPrices, stockMaster]
  );

  const initStockMaster = useCallback(
    async () => {
      if (!Array.isArray(stockMasters) || !stockMasters.length) return;
      if (stockMaster.id > 0) return;
      const firstStockMaster = stockMasters[0];
      const nStockMaster = await fetchStockMaster(firstStockMaster.id);
      if (!nStockMaster) return;
      fetchStockPrices(nStockMaster.stockCode, "week");
    },
    [fetchStockMaster, fetchStockPrices, stockMasters, stockMaster]
  );

  // lice cycle ------------------------------------------------
  useEffect(
    () => {
      initStockMaster();
    },
    [initStockMaster]
  );

  // return --------------------------------------------------

  const priceLineChartState = useMemo(
    () => ({
      ...stockPricesState,
      handleRangeSelected
    }),
    [stockPricesState, handleRangeSelected]
  );
  const stockNameState = useMemo(
    () => ({
      isLoading: stockMastersState.isLoading,
      stockName: stockMaster.name,
      stockMasters: stockMasters,
      handleStockMasterChange: fetchStockMaster,
      handleStockSearch: createStockMaster
    }),
    [
      createStockMaster,
      fetchStockMaster,
      stockMaster,
      stockMastersState.isLoading,
      stockMasters
    ]
  );

  return { priceLineChartState, stockNameState };
}

export default useStockContainer;
