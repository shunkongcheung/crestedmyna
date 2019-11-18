import { useCallback, useEffect, useState } from "react";
import { History } from "history";

function useInitStockMaster(
  fetchStockMaster: (
    id: number
  ) => Promise<{ stockCode: string; id: number } | void>,
  fetchParticipantDetails: (c: string, s: string, e: string) => Promise<any>,
  fetchStockTrends: (c: string, s: string, e: string) => Promise<any>,
  fetchStockTxs: (stockMasterId: number, page: 1) => Promise<any>,
  getDatesFromRange: (r: "year") => { startDate: string; endDate: string },
  history: History,
  setChartRange: (r: "year") => any
) {
  const [stockMasterId, setStockMasterId] = useState<number>(-1);

  const setStockMasterIdOnHistory = useCallback(() => {
    const { pathname } = window.location;
    const matching = pathname.match(/detail\/(\w+)/);
    if (!matching) return;
    const stockMasterId = Number(matching[1]);
    setStockMasterId(stockMasterId);
  }, []);

  const initStockMaster = useCallback(
    async (stockMasterId: number) => {
      const nStockMaster = await fetchStockMaster(stockMasterId);
      if (!nStockMaster) return;
      const { startDate, endDate } = getDatesFromRange("year");
      setChartRange("year");
      return Promise.all([
        fetchParticipantDetails(nStockMaster.stockCode, startDate, endDate),
        fetchStockTrends(nStockMaster.stockCode, startDate, endDate),
        fetchStockTxs(nStockMaster.id, 1)
      ]);
    },
    [
      fetchParticipantDetails,
      fetchStockMaster,
      fetchStockTrends,
      fetchStockTxs,
      getDatesFromRange,
      setChartRange
    ]
  );

  useEffect(
    () => {
      if (stockMasterId <= 0) return;
      initStockMaster(stockMasterId);
    },
    [stockMasterId, initStockMaster]
  );
  useEffect(
    () => {
      const unlisten = history.listen(setStockMasterIdOnHistory);
      setStockMasterIdOnHistory();
      return () => {
        unlisten();
      };
    },
    [history, setStockMasterIdOnHistory]
  );
}

export default useInitStockMaster;
