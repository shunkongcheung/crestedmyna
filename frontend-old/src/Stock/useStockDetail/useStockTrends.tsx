import { useCallback, useState } from "react";

import { useEditState } from "../../Base/Fetches";

// state ------------------------------------------
interface ITrend {
  nominalPrice: number;
  turnover: number;
  date: Date;
}

interface IStockTrendsState {
  isLoading: boolean;
  trends: Array<ITrend>;
}

// fetch ------------------------------------------
interface IFetchSubmit {
  start_date: string;
  end_date: string;
  stock_code: string;
}

interface ITrendRet {
  nominal_price: number;
  turnover: number;
  date: string;
}

interface IFetchRet {
  prices: Array<ITrendRet>;
}

function useStockTrends() {
  // state -------------------------------------------------------
  const [stockTrendsState, setStockTrendsState] = useState<IStockTrendsState>({
    isLoading: false,
    trends: []
  });
  const { fetchEdit } = useEditState<IFetchRet, IFetchSubmit>();

  // methods -----------------------------------------------------

  const fetchStockTrends = useCallback(
    async (stock_code: string, start_date: string, end_date: string) => {
      setStockTrendsState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchEdit("stock/stk_trend/", {
        start_date,
        end_date,
        stock_code
      });
      if (!ok) return;
      setStockTrendsState(oState => ({
        ...oState,
        isLoading: false,
        trends: payload.prices.map(itm => ({
          nominalPrice: itm.nominal_price,
          turnover: itm.turnover,
          date: new Date(itm.date)
        }))
      }));
    },
    [fetchEdit]
  );

  // return ------------------------------------------------------
  return {
    stockTrendsState,
    fetchStockTrends
  };
}

export default useStockTrends;
