import { useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";

import { useListState } from "../Base/Fetches";

interface ICCASSTrendItem {
  stockName: string;
  diffPercent: number;
  firstPercent: number;
  secondPercent: number;
  diffShare: number;
  firstShare: number;
  secondShare: number;
  diffTurnover: number;
  firstTurnover: number;
  secondTurnover: number;
}

interface ICCASSTrendState {
  ccassTrends: Array<ICCASSTrendItem>;
  isLoading: boolean;
  page: number;
  targetDate: Moment;
  total: number;
}

interface ICCASSTrendItemFetch {
  stock_name: string;
  diff_percent: number;
  first_percent: number;
  second_percent: number;
  diff_share: number;
  first_share: number;
  second_share: number;
  diff_turnover: number;
  first_turnover: number;
  second_turnover: number;
}

interface IOrderParams {
  ordering: string;
  isAscend: boolean;
}

interface IFetchParams {
  targetDate?: Moment;
  orderParams?: IOrderParams;
}

function useCCASSTrend() {
  const [ccassTrend, setCcassTrend] = useState<ICCASSTrendState>({
    ccassTrends: [],
    isLoading: true,
    page: -1,
    targetDate: moment(),
    total: 0
  });
  const { fetchList } = useListState<ICCASSTrendItemFetch>();

  const getQueryParamsFromOrderParams = useCallback(
    (orderParams?: IOrderParams) => {
      if (!orderParams) return {};
      const { ordering, isAscend } = orderParams;
      const underscoreOrdering = ordering.replace(/([A-Z])/g, function(x, y) {
        return "_" + y.toLowerCase();
      });
      const params = {
        ordering: isAscend ? `${underscoreOrdering}` : `-${underscoreOrdering}`
      };
      return params;
    },
    []
  );

  const handleListChange = useCallback(
    async (page: number, params?: IFetchParams) => {
      let { targetDate, orderParams } = params || {};
      if (!targetDate) targetDate = moment();
      const queryParams = getQueryParamsFromOrderParams(orderParams);

      setCcassTrend(oState => ({ ...oState, isLoading: true }));
      const dateStr = moment(targetDate).format("YYYYMMDD");
      const { ok, payload } = await fetchList(`stock/stk_trend/${dateStr}/`, {
        ...queryParams,
        page
      });
      if (!ok)
        return setCcassTrend(oState => ({ ...oState, isLoading: false }));

      const { count, results } = payload;
      const ccassTrends = results.map(itm => ({
        stockName: itm.stock_name,
        diffPercent: itm.diff_percent,
        firstPercent: itm.first_percent,
        secondPercent: itm.second_percent,
        diffShare: itm.diff_share,
        firstShare: itm.first_share,
        secondShare: itm.second_share,
        diffTurnover: itm.diff_turnover,
        firstTurnover: itm.first_turnover,
        secondTurnover: itm.second_turnover
      }));
      setCcassTrend({
        ccassTrends,
        isLoading: false,
        page,
        targetDate,
        total: count
      });
    },
    [fetchList, getQueryParamsFromOrderParams]
  );

  useEffect(
    () => {
      const params = {
        targetDate: moment().add(-1, "days"),
        orderParams: {
          ordering: "diffPercent",
          isAscend: false
        }
      };
      handleListChange(1, params);
    },
    [handleListChange]
  );

  return { ...ccassTrend, handleListChange };
}

export default useCCASSTrend;
