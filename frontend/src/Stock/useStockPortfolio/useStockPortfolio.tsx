import {useCallback}from 'react'
import useStockMasterTableState from "./useStockMasterTableState";

function useStockPortfolio() {
  const stockMasterTableState = useStockMasterTableState();

	const {handleListChange} = stockMasterTableState;
	const refreshStockPortfolio = useCallback(() => {
handleListChange(1);
	}, [handleListChange])

  return {refreshStockPortfolio,  stockMasterTableState };
}

export default useStockPortfolio;
