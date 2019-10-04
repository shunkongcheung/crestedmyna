import { useCallback, useState } from "react";
import { useListState } from "../../Base/Fetches";

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
  const { fetchList } = useListState<IStockTxRet>();

  // methods ----------------------------------------------------
  const fetchStockTxs = useCallback(
    async (stockMasterId: number, page: number) => {
      setStockTxsState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchList(
        `stock/stk_tx/${stockMasterId}/`,
        { page }
      );
      if (!ok)
        return setStockTxsState(oState => ({ ...oState, isLoading: false }));
      setStockTxsState({
        isLoading: false,
        page,
        stockTxs: payload.results.map(itm => ({
          txAt: new Date(itm.tx_at),
          txType: itm.tx_type,
          shareCount: itm.share_count,
          price: itm.price,
          grossValue: itm.gross_value,
          tradeCost: itm.trade_cost,
          netValue: itm.net_value
        }))
      });
    },
    [fetchList]
  );

  // return ------------------------------------------------------
  return { fetchStockTxs, stockTxsState };
}

export default useStockTxs;
