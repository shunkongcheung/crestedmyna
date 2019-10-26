import { useCallback, useState } from "react";

import { useDeleteState } from "../../Base/Fetches";
import { useFetchStockTxs } from "../hooks";

interface IStockTx {
  id: number;
  txAt: Date;
  txType: "BUY" | "SELL" | "DIVIDEND";
  shareCount: number;
  price: number;
  grossValue: number;
  tradeCost: number;
  netValue: number;
}
interface IStockTxsState {
  stockTxs: Array<IStockTx>;
  page: number;
  total: number;
  isLoading: boolean;
}

function useStockTxs() {
  const [stockTxsState, setStockTxsState] = useState<IStockTxsState>({
    isLoading: false,
    page: -1,
    total: 0,
    stockTxs: []
  });
  const { fetchStockTxs: fetchStockTxsI } = useFetchStockTxs();
  const { fetchDelete } = useDeleteState();

  // methods ----------------------------------------------------
  const fetchStockTxs = useCallback(
    async (stockMasterId: number, page: number) => {
      setStockTxsState(oState => ({ ...oState, isLoading: true }));
      const { stockTxs, total } = await fetchStockTxsI(page, {
        stockMaster: [stockMasterId]
      });
      setStockTxsState({ isLoading: false, page, total, stockTxs });
    },
    [fetchStockTxsI]
  );
  const deleteStockTx = useCallback(
    async (id: number) => fetchDelete(`stock/stk_tx/${id}/`),
    [fetchDelete]
  );

  // return ------------------------------------------------------
  return { deleteStockTx, fetchStockTxs, stockTxsState };
}

export default useStockTxs;
