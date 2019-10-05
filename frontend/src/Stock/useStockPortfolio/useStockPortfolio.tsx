import useStockMasterTableState from "./useStockMasterTableState";

function useStockPortfolio() {
  const stockMasterTableState = useStockMasterTableState();

  return { stockMasterTableState };
}

export default useStockPortfolio;
