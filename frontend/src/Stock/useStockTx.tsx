import { useCallback, useEffect, useState } from "react";
import { useDetailState, useListState } from "../Base/Fetches";

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
  const { fetchDetail } = useDetailState<ITxRet>();
  const { fetchList: fetchTxes } = useListState<{ id: number }>();
  const { fetchList: fetchStockMasters } = useListState<IStockMaster>();

  const getTxFilterParams = useCallback((filter = {} as IFilter) => {
    const filterParams = {} as any;
    if (filter.txType) filterParams.tx_type__in = filter.txType.join(",");
    if (filter.stockMaster)
      filterParams.stock_master__in = filter.stockMaster.join(",");
    return filterParams;
  }, []);

  const getTxIds = useCallback(
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
      if (!ok) return { total: 0, txIds: [] };
      return {
        total: count,
        txIds: results.map(itm => itm.id)
      };
    },
    [fetchTxes, getTxFilterParams]
  );

  const getTxDetail = useCallback(
    async (stockTxId: number): Promise<undefined | ITx> => {
      const { ok, payload } = await fetchDetail(`stock/stk_tx/${stockTxId}/`);
      if (!ok) return undefined;
      return {
        grossValue: payload.gross_value,
        netValue: payload.net_value,
        price: payload.price,
        shareCount: payload.share_count,
        stockMaster: payload.stock_master,
        tradeCost: payload.trade_cost,
        txAt: new Date(payload.tx_at),
        txType: payload.tx_type
      };
    },
    [fetchDetail]
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
      const [{ total, txIds }, stockMasters] = await Promise.all([
        getTxIds(page, filter),
        getStockMasters()
      ]);
      const stockTxsWithUndefined = await Promise.all(txIds.map(getTxDetail));
      const stockTxs = stockTxsWithUndefined.filter(
        itm => itm !== undefined
      ) as Array<ITx>;
      setTxState({
        filter,
        isLoading: false,
        stockMasters,
        page,
        total,
        stockTxs
      });
    },
    [getTxIds, getTxDetail, getStockMasters]
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
