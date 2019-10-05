import { useCallback, useState } from "react";
import { useFetchStockTxs } from "../hooks";

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

function useStockTxs() {
  const [stockTxsState, setStockTxsState] = useState<IStockTxsState>({
    isLoading: false,
    page: -1,
    stockTxs: []
  });
  const { fetchStockTxs: fetchStockTxsI } = useFetchStockTxs();

  // methods ----------------------------------------------------
  const fetchStockTxs = useCallback(
    async (stockMasterId: number, page: number) => {
      setStockTxsState(oState => ({ ...oState, isLoading: true }));
      const { stockTxs } = await fetchStockTxsI(page, {
        stockMaster: [stockMasterId]
      });
      setStockTxsState({ isLoading: false, page, stockTxs });
    },
    [fetchStockTxsI]
  );

  // return ------------------------------------------------------
  return { fetchStockTxs, stockTxsState };
}

export default useStockTxs;
