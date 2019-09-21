import { useCallback, useEffect, useMemo } from "react";

import useStockPrices from "./useStockPrices";
import useStockMaster from "./useStockMaster";
import useStockMasters from "./useStockMasters";
import useStockTxAdd from "./useStockTxAdd";
import useStockTxs from "./useStockTxs";
import useStockProfile from "./useStockProfile";

function useStockContainer() {
  const { fetchStockPrices, stockPricesState } = useStockPrices();
  const {
    createStockMaster,
    stockMasterState,
    fetchStockMaster
  } = useStockMaster();
  const { fetchStockTxs, stockTxsState } = useStockTxs();
  const { stockProfileState, handleStockProfileChange } = useStockProfile();

  const { stockMastersState } = useStockMasters();
  const { stockMasters } = stockMastersState;
  const { stockMaster } = stockMasterState;

  const { handleAddTx } = useStockTxAdd(
    stockMaster.id,
    fetchStockTxs,
    fetchStockMaster
  );

  // methods ------------------------------------------------
  const handleRangeSelected = useCallback(
    range => fetchStockPrices(stockMaster.stockCode, range),
    [fetchStockPrices, stockMaster]
  );

  const handleStockMasterChange = useCallback(
    async stockMasterId => {
      const stockMaster = await fetchStockMaster(stockMasterId);
      if (!stockMaster) return;
      return Promise.all([
        fetchStockPrices(stockMaster.stockCode, "week"),
        fetchStockTxs(stockMaster.id, 1)
      ]);
    },
    [fetchStockMaster, fetchStockPrices, fetchStockTxs]
  );
  const handleStockSearch = useCallback(
    async stockCode => {
      const nStockMaster = await createStockMaster(stockCode);
      if (nStockMaster) return fetchStockPrices(stockCode, "week");
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
      return Promise.all([
        fetchStockPrices(nStockMaster.stockCode, "week"),
        fetchStockTxs(nStockMaster.id, 1)
      ]);
    },
    [
      fetchStockMaster,
      fetchStockPrices,
      fetchStockTxs,
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
    priceLineChartState,
    stockInfoState,
    stockNameState,
    stockTxTableState
  };
}

export default useStockContainer;
