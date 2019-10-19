import { useCallback, useMemo } from "react";
import { History } from "history";

import { useStockSectors } from "../hooks";

import usePortfolioSummary from "./usePortfolioSummary";
import useStockDistribution from "./useStockDistribution";
import useStockProfile from "./useStockProfile";
import useStockSearch from "./useStockSearch";
import useStockMasterTableState from "./useStockMasterTableState";

function useStockPortfolio(history: History) {
  const fakeStockMaster = useMemo(
    () => ({ id: -1, stockCode: "", sector: -1 }),
    []
  );
  const portfolioSummary = usePortfolioSummary();
  const { handleSectorsChange, sectors: selectedSectors } = portfolioSummary;

  const { initDistribution, ...stockDistribution } = useStockDistribution();

  const stockMasterTable = useStockMasterTableState(selectedSectors);
  const { handleListChange } = stockMasterTable;

  const stockSectors = useStockSectors(fakeStockMaster);
  const stockProfileState = useStockProfile();
  // methods -------------------------------------------------------
  const refreshStockPortfolio = useCallback(
    () => {
      handleListChange(1);
      handleSectorsChange([]);
      initDistribution();
    },
    [handleListChange, handleSectorsChange, initDistribution]
  );

  // state tha depends on refresh
  const stockSearchState = useStockSearch(history, refreshStockPortfolio);

  // return -------------------------------------------------------
  const ctrlState = useMemo(() => ({ stockProfileState, stockSearchState }), [
    stockProfileState,
    stockSearchState
  ]);
  const stockMasterTableState = useMemo(
    () => ({
      ...stockMasterTable,
      sectors: stockSectors.sectors,
      isLoading: stockMasterTable.isLoading || stockSectors.isLoading
    }),
    [stockMasterTable, stockSectors]
  );
  const portfolioSummaryState = useMemo(
    () => ({
      ...portfolioSummary,
      sectors: stockSectors.sectors,
      isLoading: portfolioSummary.isLoading || stockSectors.isLoading
    }),
    [portfolioSummary, stockSectors]
  );

  const chartsState = useMemo(
    () => ({
      selectedSectors,
      ...stockDistribution,
      marketValue: portfolioSummaryState.marketValue,
      unrealizedValue: portfolioSummaryState.unrealizedValue
    }),
    [
      selectedSectors,
      stockDistribution,
      portfolioSummaryState.marketValue,
      portfolioSummaryState.unrealizedValue
    ]
  );

  return {
    ctrlState,
    chartsState,
    portfolioSummaryState,
    refreshStockPortfolio,
    stockMasterTableState
  };
}

export default useStockPortfolio;
