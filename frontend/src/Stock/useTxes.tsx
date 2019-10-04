import { useCallback, useEffect, useState } from "react";
import { useListState } from "../Base/Fetches";

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
interface ITxRet {
  gross_value: number;
  net_value: number;
  price: number;
  share_count: number;
  stock_master: number;
  trade_cost: number;
  tx_at: string;
  tx_type: "BUY" | "SELL";
}
interface ITxState {
  txes: Array<ITx>;
  stockMasters: Array<IStockMaster>;
  page: number;
  total: number;
  filter?: IFilter;
  isLoading: boolean;
}
function useTxes() {
  const [txState, setTxState] = useState<ITxState>({
    isLoading: true,
    page: 1,
    stockMasters: [],
    total: 1,
    txes: []
  });
  const { fetchList: fetchTxes } = useListState<ITxRet>();
  const { fetchList: fetchStockMasters } = useListState<IStockMaster>();

  const getTxFilterParams = useCallback((filter = {} as IFilter) => {
    const filterParams = {} as any;
    if (filter.txType) filterParams.tx_type__in = filter.txType.join(",");
    if (filter.stockMaster)
      filterParams.stock_master__in = filter.stockMaster.join(",");
    return filterParams;
  }, []);

  const getTxes = useCallback(
    async (page: number, filter: IFilter) => {
      if (filter) page = 1;
      const PAGE_SIZE = 10;
      const filterParams = getTxFilterParams(filter);
      const { ok, payload } = await fetchTxes("stock/stk_tx/list/", {
        page,
        page_size: PAGE_SIZE,
        ...filterParams
      });
      const { count, results } = payload;
      if (!ok) return { total: 0, txes: [] };
      return {
        total: count,
        txes: results.map(itm => ({
          grossValue: itm.gross_value,
          netValue: itm.net_value,
          price: itm.price,
          shareCount: itm.share_count,
          stockMaster: itm.stock_master,
          tradeCost: itm.trade_cost,
          txAt: new Date(itm.tx_at),
          txType: itm.tx_type
        }))
      };
    },
    [fetchTxes, getTxFilterParams]
  );

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
      const [{ total, txes }, stockMasters] = await Promise.all([
        getTxes(page, filter),
        getStockMasters()
      ]);
      setTxState({ filter, isLoading: false, stockMasters, page, total, txes });
    },
    [getTxes, getStockMasters]
  );

  useEffect(
    () => {
      handleListChange(1, {});
    },
    [handleListChange]
  );

  return { ...txState, handleListChange };
}

export default useTxes;
