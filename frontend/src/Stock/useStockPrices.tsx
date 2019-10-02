import { useCallback, useState } from "react";

import { useEditState } from "../Base/Fetches";

// state ------------------------------------------
interface IStockPrice {
  nominalPrice: number;
  date: Date;
}

interface IStockPricesState {
  isLoading: boolean;
  prices: Array<IStockPrice>;
}

// fetch ------------------------------------------
interface IFetchSubmit {
  start_date: string;
  end_date: string;
  stock_code: string;
}

interface IPriceRet {
  nominal_price: number;
  date: string;
}

interface IFetchRet {
  prices: Array<IPriceRet>;
}

function useStockPrices() {
  // state -------------------------------------------------------
  const [stockPricesState, setStockPricesState] = useState<IStockPricesState>({
    isLoading: false,
    prices: []
  });
  const { fetchEdit } = useEditState<IFetchRet, IFetchSubmit>();

  // methods -----------------------------------------------------

  const fetchStockPrices = useCallback(
    async (stockCode: string, start_date: string, end_date: string) => {
      setStockPricesState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchEdit("stock/stk_price/", {
        start_date,
        end_date,
        stock_code: stockCode
      });
      if (!ok) return;
      setStockPricesState(oState => ({
        ...oState,
        isLoading: false,
        prices: payload.prices.map(itm => ({
          nominalPrice: itm.nominal_price,
          date: new Date(itm.date)
        }))
      }));
    },
    [fetchEdit]
  );

  // return ------------------------------------------------------
  return {
    stockPricesState,
    fetchStockPrices
  };
}

export default useStockPrices;
