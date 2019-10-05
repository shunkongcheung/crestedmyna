import { useCallback, useState } from "react";
import { useDetailState, useListState } from "../../Base/Fetches";

interface IStockTx {
  txAt: Date;
  txType: "BUY" | "SELL";
  shareCount: number;
  price: number;
  grossValue: number;
  tradeCost: number;
  netValue: number;
}
interface IStockTxsState {
  stockTxs: Array<IStockTx>;
  page: number;
  isLoading: boolean;
}

interface IStockTxRet {
  tx_type: "BUY" | "SELL";
  tx_at: string;
  share_count: number;
  price: number;
  gross_value: number;
  trade_cost: number;
  net_value: number;
}

function useStockTxs() {
  const [stockTxsState, setStockTxsState] = useState<IStockTxsState>({
    isLoading: false,
    page: -1,
    stockTxs: []
  });
  const { fetchDetail } = useDetailState<IStockTxRet>();
  const { fetchList } = useListState<{ id: number }>();

  // methods ----------------------------------------------------
  const getStockTxIds = useCallback(
    async (stockMasterId: number, page: number) => {
      const { ok, payload } = await fetchList(`stock/stk_tx/list/`, {
        page,
        page_size: 1000,
        stock_master__in: stockMasterId
      });
      return ok ? payload.results.map(itm => itm.id) : [];
    },
    [fetchList]
  );

  const getStockTxDetail = useCallback(
    async (stockTxId: number) => {
      const { ok, payload } = await fetchDetail(`stock/stk_tx/${stockTxId}/`);
      if (!ok) return undefined;
      return {
        txAt: new Date(payload.tx_at),
        txType: payload.tx_type,
        shareCount: payload.share_count,
        price: payload.price,
        grossValue: payload.gross_value,
        tradeCost: payload.trade_cost,
        netValue: payload.net_value
      };
    },
    [fetchDetail]
  );

  const fetchStockTxs = useCallback(
    async (stockMasterId: number, page: number) => {
      setStockTxsState(oState => ({ ...oState, isLoading: true }));
      const stockTxIds = await getStockTxIds(stockMasterId, page);
      console.log(stockTxIds);
      const stockTxsWithUndefined = await Promise.all(
        stockTxIds.map(getStockTxDetail)
      );
      const stockTxs = stockTxsWithUndefined.filter(
        itm => itm !== undefined
      ) as Array<IStockTx>;
      setStockTxsState({ isLoading: false, page, stockTxs });
    },
    [getStockTxIds, getStockTxDetail]
  );

  // return ------------------------------------------------------
  return { fetchStockTxs, stockTxsState };
}

export default useStockTxs;
