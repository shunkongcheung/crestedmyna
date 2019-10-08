import { useCallback, useMemo } from "react";

import { useStockSectors } from "../hooks";
import usePortfolioSummary from "./usePortfolioSummary";
import useStockMasterTableState from "./useStockMasterTableState";

function useStockPortfolio() {
  const fakeStockMaster = useMemo(
    () => ({ id: -1, stockCode: "", sector: -1 }),
    []
  );

  const portfolioSummary = usePortfolioSummary();
  const { handleSectorsChange, sectors: selectedSectors } = portfolioSummary;

  const stockMasterTable = useStockMasterTableState(selectedSectors);
  const stockSectors = useStockSectors(fakeStockMaster);

  const { handleListChange } = stockMasterTable;
  const refreshStockPortfolio = useCallback(
    () => {
      handleListChange(1);
      handleSectorsChange([]);
    },
    [handleListChange, handleSectorsChange]
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

  return {
    refreshStockPortfolio,
    stockMasterTableState,
    portfolioSummaryState
  };
}

export default useStockPortfolio;
