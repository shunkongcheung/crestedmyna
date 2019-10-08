import { useCallback, useMemo } from "react";

import { useStockSectors } from "../hooks";
import usePortfolioSummary from "./usePortfolioSummary";
import useStockCountDistribution from "./useStockCountDistribution";
import useStockMasterTableState from "./useStockMasterTableState";

function useStockPortfolio() {
  const fakeStockMaster = useMemo(
    () => ({ id: -1, stockCode: "", sector: -1 }),
    []
  );
  const portfolioSummary = usePortfolioSummary();
  const { handleSectorsChange, sectors: selectedSectors } = portfolioSummary;

  const {
    initCountDistribution,
    ...stockCountDistribution
  } = useStockCountDistribution();

  const stockMasterTable = useStockMasterTableState(selectedSectors);
  const { handleListChange } = stockMasterTable;

  const stockSectors = useStockSectors(fakeStockMaster);

  // methods -------------------------------------------------------
  const refreshStockPortfolio = useCallback(
    () => {
      handleListChange(1);
      handleSectorsChange([]);
      initCountDistribution();
    },
    [handleListChange, handleSectorsChange, initCountDistribution]
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

  const chartsState = useMemo(() => ({ stockCountDistribution }), [
    stockCountDistribution
  ]);

  return {
    chartsState,
    portfolioSummaryState,
    refreshStockPortfolio,
    stockMasterTableState
  };
}

export default useStockPortfolio;
