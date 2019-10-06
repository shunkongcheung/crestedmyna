import { useCallback, useState } from "react";
import {
  useDetailState,
  useEditState,
  useDeleteState
} from "../../Base/Fetches";

interface IStockMaster {
  name: string;
  id: number;
  stockCode: string;
  shareCount: number;
  marketPrice: number;
  marketValue: number;
  realizedValue: number;
  turnover: number;
  unrealizedValue: number;
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
  turnover: number;
  unrealized_value: number;
}
interface IStockMasterSubmit {
  stock_code: string;
}

function getInitialStockMaster() {
  return {
    name: "",
    id: -1,
    stockCode: "",
    shareCount: 0,
    marketPrice: 0,
    marketValue: 0,
    realizedValue: 0,
    turnover: 0,
    unrealizedValue: 0
  };
}

function useStockMaster() {
  // state --------------------------------------------
  const [stockMasterState, setStockMasterState] = useState<IStockMasterState>({
    isLoading: false,
    stockMaster: getInitialStockMaster()
  });

  const { fetchDetail } = useDetailState<IStockMasterRet>();
  const { fetchEdit } = useEditState<IStockMasterRet, IStockMasterSubmit>();
  const { fetchDelete } = useDeleteState();

  const getStockMasterFromPayload = useCallback(
    (payload: IStockMasterRet): IStockMaster => {
      return {
        name: payload.name,
        id: payload.id,
        stockCode: payload.stock_code,
        shareCount: payload.share_count,
        marketPrice: payload.market_price,
        marketValue: payload.market_value,
        turnover: payload.turnover,
        realizedValue: payload.realized_value,
        unrealizedValue: payload.unrealized_value
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

  const deleteStockMaster = useCallback(
    async () => {
      let stockMasterId = stockMasterState.stockMaster.id;
      setStockMasterState(oState => ({ ...oState, isLoading: true }));
      const { ok } = await fetchDelete(`stock/stk_master/${stockMasterId}/`);
      setStockMasterState({
        isLoading: false,
        stockMaster: getInitialStockMaster()
      });
      return ok;
    },
    [fetchDelete, stockMasterState.stockMaster.id]
  );

  // return --------------------------------------------
  const fetchStockMaster = useCallback(
    async (id: number) => {
      if (id < 0) return;
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
    deleteStockMaster,
    stockMasterState,
    fetchStockMaster
  };
}

export default useStockMaster;
