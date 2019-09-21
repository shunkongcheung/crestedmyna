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

  const handleStockMasterChange = useCallback(
    async stockMasterId => {
      const stockMaster = await fetchStockMaster(stockMasterId);
      if (!stockMaster) return;
      fetchStockPrices(stockMaster.stockCode, "week");
    },
    [fetchStockMaster, fetchStockPrices]
  );
  const handleStockSearch = useCallback(
    async stockCode => {
      const nStockMaster = await createStockMaster(stockCode);
      if (nStockMaster) fetchStockPrices(stockCode, "week");
    },
    [createStockMaster, fetchStockPrices]
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

  return { priceLineChartState, stockInfoState, stockNameState };
}

export default useStockContainer;
