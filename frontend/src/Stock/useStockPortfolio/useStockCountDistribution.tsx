import { useCallback, useEffect, useState } from "react";

import { useEditState } from "../../Base/Fetches";

interface IStockCountItem {
  name: string;
  count: number;
}
interface IStockCountState {
  isLoading: boolean;
  stockCountItems: Array<IStockCountItem>;
}
interface IStockCountRet {
  count_distributions: Array<IStockCountItem>;
}
function useStockCountDistribution() {
  const [stockCountState, setStockCountState] = useState<IStockCountState>({
    isLoading: true,
    stockCountItems: []
  });

  const { fetchEdit } = useEditState<IStockCountRet, {}>();

  const initCountDistribution = useCallback(
    async () => {
      setStockCountState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchEdit(
        "stock/stk_portfolio/count_distribution/",
        {}
      );
      if (!ok)
        return setStockCountState(oState => ({ ...oState, isLoading: false }));
      const { count_distributions: stockCountItems } = payload;
      setStockCountState({ isLoading: false, stockCountItems });
    },
    [fetchEdit]
  );

  useEffect(
    () => {
      initCountDistribution();
    },
    [initCountDistribution]
  );

  return { ...stockCountState, initCountDistribution };
}

export default useStockCountDistribution;
