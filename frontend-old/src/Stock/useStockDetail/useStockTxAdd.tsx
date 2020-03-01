import { useCallback } from "react";
import moment from "moment";

import { useEditState } from "../../Base/Fetches";

type TTxType = "BUY" | "SELL" | "DIVIDEND";

interface IStockTx {
  txType: TTxType;
  txAt: Date;
  shareCount: number;
  price: number;
}
interface IStockTxRet {
  stock_master: number;
  tx_type: TTxType;
  tx_at: string;
  share_count: number;
  price: number;
}

function useStockTxAdd(
  stockMasterId: number,
  fetchTxs: (sm: number, p: 1) => any,
  fetchStockMaster: (sm: number) => any
) {
  const { fetchEdit } = useEditState<IStockTxRet>();

  const handleAddTx = useCallback(
    async (stockProfile: IStockTx, formApis: any) => {
      const submitValues = {
        stock_master: stockMasterId,
        tx_type: stockProfile.txType,
        tx_at: moment(stockProfile.txAt).format("YYYY-MM-DD"),
        share_count: stockProfile.shareCount,
        price: stockProfile.price
      };
      const { ok } = await fetchEdit("stock/stk_tx/create/", submitValues, {
        formApis
      });
      if (!ok) return;
      fetchTxs(stockMasterId, 1);
      fetchStockMaster(stockMasterId);
    },
    [fetchTxs, fetchEdit, fetchStockMaster, stockMasterId]
  );

  return { handleAddTx };
}

export default useStockTxAdd;
