import { useCallback, useState } from "react";
import moment from "moment";

import { useEditState } from "../Base/Fetches";

// state ------------------------------------------
interface IStockPrice {
  nominalPrice: number;
  date: Date;
}
type TRange = "week" | "month" | "year" | "5years";

interface IStockPricesState {
  isLoading: boolean;
  prices: Array<IStockPrice>;
  range: TRange;
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
    prices: [],
    range: "week"
  });
  const { fetchEdit } = useEditState<IFetchRet, IFetchSubmit>();

  // methods -----------------------------------------------------
  const getDatesFromRange = useCallback((range: TRange): {
    start_date: string;
    end_date: string;
  } => {
    const today = new Date();

    const lastMonday = new Date();
    lastMonday.setDate(today.getDate() - today.getDay());

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);

    const firstDayYear = new Date();
    firstDayYear.setDate(1);
    firstDayYear.setMonth(0);

    const fiveYears = new Date();
    fiveYears.setDate(1);
    fiveYears.setMonth(0);
    fiveYears.setFullYear(today.getFullYear() - 5);

    const ret = { end_date: moment(today).format("YYYY-MM-DD") };
    switch (range) {
      case "week":
        return { ...ret, start_date: moment(lastMonday).format("YYYY-MM-DD") };
      case "month":
        return {
          ...ret,
          start_date: moment(firstDayOfMonth).format("YYYY-MM-DD")
        };
      case "year":
        return {
          ...ret,
          start_date: moment(firstDayYear).format("YYYY-MM-DD")
        };
      case "5years":
        return { ...ret, start_date: moment(fiveYears).format("YYYY-MM-DD") };
      default:
        return { ...ret, start_date: moment(today).format("YYYY-MM-DD") };
    }
  }, []);

  const fetchStockPrices = useCallback(
    async (stockCode: string, range: TRange) => {
      const dates = getDatesFromRange(range);
      setStockPricesState(oState => ({ ...oState, isLoading: true, range }));
      const { ok, payload } = await fetchEdit("stock/stk_price/", {
        ...dates,
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
    [fetchEdit, getDatesFromRange]
  );

  // return ------------------------------------------------------
  return {
    stockPricesState,
    fetchStockPrices
  };
}

export default useStockPrices;
