import { useCallback, useEffect, useState } from "react";
import { useListState } from "../Base/Fetches";
import { useFetchStockTxs } from "./hooks";

type TTxType = "BUY" | "SELL";

interface IFilter {
  txType?: Array<TTxType>;
  stockMaster?: Array<number>;
}
interface IStockMaster {
  name: string;
  id: number;
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
  stockMasters: Array<IStockMaster>;
  page: number;
  total: number;
  filter?: IFilter;
  isLoading: boolean;
}
function useStockTx() {
  const [txState, setTxState] = useState<ITxState>({
    isLoading: true,
    page: 1,
    stockMasters: [],
    total: 1,
    stockTxs: []
  });
  const { fetchList: fetchStockMasters } = useListState<IStockMaster>();
  const { fetchStockTxs } = useFetchStockTxs();

  const getStockMasters = useCallback(
    async () => {
      const { ok, payload } = await fetchStockMasters(
        "stock/stk_master/list/",
        { page_size: 1000 }
      );
      return ok ? payload.results : [];
    },
    [fetchStockMasters]
  );

  const handleListChange = useCallback(
    async (page: number = 1, filter: IFilter) => {
      setTxState(oState => ({ ...oState, isLoading: true }));
      const [{ total, stockTxs }, stockMasters] = await Promise.all([
        fetchStockTxs(page, filter),
        getStockMasters()
      ]);
      const isLoading = false;
      setTxState({ filter, isLoading, stockMasters, page, total, stockTxs });
    },
    [fetchStockTxs, getStockMasters]
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
