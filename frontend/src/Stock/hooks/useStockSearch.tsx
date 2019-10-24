import { useCallback, useState } from "react";
import { History } from "history";

import { useEditState } from "../../Base/Fetches";

interface IStockMasterFetch {
  stock_code: string;
}
interface IStockMasterRet {
  id: number;
}

function useStockSearch(history: History, refreshStockPortfolio: () => any) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchEdit } = useEditState<IStockMasterRet, IStockMasterFetch>();

  const handleStockSearch = useCallback(
    async (stockCode: string) => {
      setIsLoading(true);
      const stock_code = stockCode.padStart(5, "0");
      const { ok, payload } = await fetchEdit(`stock/stk_master/create/`, {
        stock_code
      });
      if (!ok) return setIsLoading(false);
      const { id: newStockMasterId } = payload;
      setIsLoading(false);
      refreshStockPortfolio();
      history.push(`/stock/detail/${newStockMasterId}`);
    },
    [fetchEdit, history, refreshStockPortfolio]
  );

  return { isLoading, handleStockSearch };
}

export default useStockSearch;
