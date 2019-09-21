import { useCallback, useState } from "react";
import { useDetailState, useEditState } from "../Base/Fetches";

interface IStockMaster {
  name: string;
  id: number;
  stockCode: string;
  shareCount: number;
  marketPrice: number;
  marketValue: number;
  realizedValue: number;
}
interface IStockMasterState {
  isLoading: boolean;
  stockMaster: IStockMaster;
}

interface IStockMasterRet {
  name: string;
  id: number;
  stock_code: string;
  share_count: number;
  market_price: number;
  market_value: number;
  realized_value: number;
}
interface IStockMasterSubmit {
  stock_code: string;
}

function useStockMaster() {
  // state --------------------------------------------
  const [stockMasterState, setStockMasterState] = useState<IStockMasterState>({
    isLoading: false,
    stockMaster: {
      name: "",
      id: -1,
      stockCode: "",
      shareCount: 0,
      marketPrice: 0,
      marketValue: 0,
      realizedValue: 0
    }
  });

  const { fetchDetail } = useDetailState<IStockMasterRet>();
  const { fetchEdit } = useEditState<IStockMasterRet, IStockMasterSubmit>();

  const getStockMasterFromPayload = useCallback(
    (payload: IStockMasterRet): IStockMaster => {
      return {
        name: payload.name,
        id: payload.id,
        stockCode: payload.stock_code,
        shareCount: payload.share_count,
        marketPrice: payload.market_price,
        marketValue: payload.market_value,
        realizedValue: payload.realized_value
      };
    },
    []
  );

  const createStockMaster = useCallback(
    async (stockCode: string) => {
      setStockMasterState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchEdit(`stock/stk_master/create/`, {
        stock_code: stockCode
      });
      if (!ok)
        return setStockMasterState(oState => ({ ...oState, isLoading: false }));

      const nextState = {
        stockMaster: getStockMasterFromPayload(payload),
        isLoading: false
      };
      setStockMasterState(nextState);
      return nextState.stockMaster;
    },
    [fetchEdit, getStockMasterFromPayload]
  );

  // return --------------------------------------------
  const fetchStockMaster = useCallback(
    async (id: number) => {
      setStockMasterState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchDetail(`stock/stk_master/${id}/`);
      if (!ok)
        return setStockMasterState(oState => ({ ...oState, isLoading: false }));
      const nextState = {
        stockMaster: getStockMasterFromPayload(payload),
        isLoading: false
      };
      setStockMasterState(nextState);
      return nextState.stockMaster;
    },
    [fetchDetail, getStockMasterFromPayload]
  );

  return {
    createStockMaster,
    stockMasterState,
    fetchStockMaster
  };
}

export default useStockMaster;
