import { useCallback, useMemo } from "react";

import { useStockSectors } from "../hooks";
import useStockMasterTableState from "./useStockMasterTableState";

function useStockPortfolio() {
  const fakeStockMaster = useMemo(
    () => ({ id: -1, stockCode: "", sector: -1 }),
    []
  );
  const stockMasterTable = useStockMasterTableState();
  const stockSectors = useStockSectors(fakeStockMaster);

  const { handleListChange } = stockMasterTable;
  const refreshStockPortfolio = useCallback(
    () => {
      handleListChange(1);
    },
    [handleListChange]
  );

  const stockMasterTableState = useMemo(
    () => ({
      ...stockMasterTable,
      sectors: stockSectors.sectors,
      isLoading: stockMasterTable.isLoading || stockSectors.isLoading
    }),
    [stockMasterTable, stockSectors]
  );

  return { refreshStockPortfolio, stockMasterTableState };
}

export default useStockPortfolio;
