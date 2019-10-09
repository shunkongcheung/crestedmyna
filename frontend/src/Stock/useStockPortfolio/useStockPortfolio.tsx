import { useCallback, useMemo } from "react";

import { useStockSectors } from "../hooks";
import usePortfolioSummary from "./usePortfolioSummary";
import useStockDistribution from "./useStockDistribution";
import useStockMasterTableState from "./useStockMasterTableState";

function useStockPortfolio() {
  const fakeStockMaster = useMemo(
    () => ({ id: -1, stockCode: "", sector: -1 }),
    []
  );
  const portfolioSummary = usePortfolioSummary();
  const { handleSectorsChange, sectors: selectedSectors } = portfolioSummary;

  const {
    initDistribution,
    ...stockDistribution
  } = useStockDistribution();

  const stockMasterTable = useStockMasterTableState(selectedSectors);
  const { handleListChange } = stockMasterTable;

  const stockSectors = useStockSectors(fakeStockMaster);

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

  const chartsState = useMemo(() => ({ ...stockDistribution }), [
    stockDistribution
  ]);

  return {
    chartsState,
    portfolioSummaryState,
    refreshStockPortfolio,
    stockMasterTableState
  };
}

export default useStockPortfolio;
