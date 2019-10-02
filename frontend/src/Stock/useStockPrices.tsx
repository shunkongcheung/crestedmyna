import { useCallback, useState } from "react";

import { useEditState } from "../Base/Fetches";
import useGetNumArray from "./useGetNumArray";

// state ------------------------------------------

interface IStockPricesState {
  isLoading: boolean;
  prices: Array<number>;
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
  const { getNumArray } = useGetNumArray();

  // methods -----------------------------------------------------

  const fetchStockPrices = useCallback(
    async (stock_code: string, start_date: string, end_date: string) => {
      setStockPricesState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchEdit("stock/stk_price/", {
        start_date,
        end_date,
        stock_code
      });
      if (!ok) return;
      setStockPricesState(oState => ({
        ...oState,
        isLoading: false,
        prices: getNumArray(
          payload.prices,
          "nominal_price",
          "date",
          new Date(start_date),
          new Date(end_date)
        )
      }));
    },
    [fetchEdit, getNumArray]
  );

  // return ------------------------------------------------------
  return {
    stockPricesState,
    fetchStockPrices
  };
}

export default useStockPrices;
