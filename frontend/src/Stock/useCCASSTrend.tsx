import { useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";

import { useListState } from "../Base/Fetches";

interface ICCASSTrendItem {
  participantName: string;
  diffPercent: string;
  firstPercent: string;
  secondPercent: string;
}

interface ICCASSTrendState {
  ccassTrends: Array<ICCASSTrendItem>;
  isLoading: boolean;
  page: number;
  targetDate: Moment;
  total: number;
}

interface ICCASSTrendItemFetch {
  participant_name: string;
  diff_percent: string;
  first_percent: string;
  second_percent: string;
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

  const handleListChange = useCallback(
    async (page: number, targetDate?: Moment) => {
      setCcassTrend(oState => ({ ...oState, isLoading: true }));
      if (!targetDate) targetDate = moment();
      const dateStr = moment(targetDate).format("YYYYMMDD");
      const { ok, payload } = await fetchList(`stock/stk_ccass/${dateStr}/`);
      if (!ok)
        return setCcassTrend(oState => ({ ...oState, isLoading: false }));

      const { count, results } = payload;
      const ccassTrends = results.map(itm => ({
        participantName: itm.participant_name,
        diffPercent: itm.diff_percent,
        firstPercent: itm.first_percent,
        secondPercent: itm.second_percent
      }));
      setCcassTrend({
        ccassTrends,
        isLoading: false,
        page,
        targetDate,
        total: count
      });
    },
    [fetchList]
  );

  useEffect(
    () => {
      handleListChange(1);
    },
    [handleListChange]
  );

  return { ...ccassTrend, handleListChange };
}

export default useCCASSTrend;
