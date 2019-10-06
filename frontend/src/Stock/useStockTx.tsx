import { useCallback, useEffect, useState } from "react";
import { useFetchStockTxs } from "./hooks";

type TTxType = "BUY" | "SELL";

interface IFilter {
  txType?: Array<TTxType>;
  stockMaster?: Array<number>;
}
interface ITx {
  grossValue: number;
  netValue: number;
  price: number;
  shareCount: number;
  stockMaster: number;
  tradeCost: number;
  txAt: Date;
  txType: TTxType;
}
interface ITxState {
  stockTxs: Array<ITx>;
  page: number;
  total: number;
  filter?: IFilter;
  isLoading: boolean;
}
function useStockTx() {
  const [txState, setTxState] = useState<ITxState>({
    isLoading: true,
    page: 1,
    total: 1,
    stockTxs: []
  });
  const { fetchStockTxs } = useFetchStockTxs();

  const handleListChange = useCallback(
    async (page: number = 1, filter: IFilter) => {
      setTxState(oState => ({ ...oState, isLoading: true }));
      const { total, stockTxs } = await fetchStockTxs(page, filter);
      const isLoading = false;
      setTxState({ filter, isLoading, page, total, stockTxs });
    },
    [fetchStockTxs]
  );

  useEffect(
    () => {
      handleListChange(1, {});
    },
    [handleListChange]
  );

  return { ...txState, handleListChange };
}

export default useStockTx;
