import { useCallback, useMemo } from "react";

import { useStockSectors } from "../hooks";

import usePortfolioSummary from "./usePortfolioSummary";
import useStockDistribution from "./useStockDistribution";
import useStockProfile from "./useStockProfile";
import useStockMasterTableState from "./useStockMasterTableState";

function useStockPortfolio() {
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

  // return -------------------------------------------------------
  const ctrlState = useMemo(
    () => ({
      stockProfileState
    }),
    [stockProfileState]
  );
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
    () => ({ selectedSectors, ...stockDistribution }),
    [selectedSectors, stockDistribution]
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
