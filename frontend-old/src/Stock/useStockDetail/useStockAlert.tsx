import { useCallback, useEffect, useState } from "react";

import { useDetailState, useEditState } from "../../Base/Fetches";

type TCondition = "COND_ABOVE" | "COND_BELOW";
interface IStockAlert {
  marketPriceValue: number;
  marketPriceCondition: TCondition;
  ccassPercentValue: number;
  ccassPercentCondition: TCondition;
  lastTriggerAt?: Date;
}
interface IStockAlertFetch {
  stock_code: string;
  market_price_value: number;
  market_price_condition: TCondition;
  market_price_trigger_at?: string;
  ccass_percent_value: number;
  ccass_percent_condition: TCondition;
  ccass_percent_trigger_at?: string;
}

interface IStockAlertState {
  stockAlert: IStockAlert;
  isLoading: boolean;
}

function useStockAlert(stockCode: string) {
  const [stockAlertState, setStockAlert] = useState<IStockAlertState>({
    stockAlert: {
      marketPriceValue: -1,
      marketPriceCondition: "COND_ABOVE",
      ccassPercentValue: -1,
      ccassPercentCondition: "COND_ABOVE",
      lastTriggerAt: undefined
    },
    isLoading: true
  });
  const { fetchDetail } = useDetailState<IStockAlertFetch>();
  const { fetchEdit } = useEditState<IStockAlertFetch>();

  const getStockAlertFromFetch = useCallback(
    (alertFetch: IStockAlertFetch): IStockAlert => {
      let lastTriggerAt = undefined;
      if (!lastTriggerAt && alertFetch.market_price_trigger_at)
        lastTriggerAt = new Date(alertFetch.market_price_trigger_at);
      if (!lastTriggerAt && alertFetch.ccass_percent_trigger_at)
        lastTriggerAt = new Date(alertFetch.ccass_percent_trigger_at);
      return {
        marketPriceValue: alertFetch.market_price_value,
        marketPriceCondition: alertFetch.market_price_condition,
        ccassPercentValue: alertFetch.ccass_percent_value,
        ccassPercentCondition: alertFetch.ccass_percent_condition,
        lastTriggerAt
      };
    },
    []
  );

  const getStockAlertFetch = useCallback(
    (stockAlert: IStockAlert): IStockAlertFetch => ({
      stock_code: stockCode,
      market_price_value: stockAlert.marketPriceValue,
      market_price_condition: stockAlert.marketPriceCondition,
      ccass_percent_value: stockAlert.ccassPercentValue,
      ccass_percent_condition: stockAlert.ccassPercentCondition
    }),
    [stockCode]
  );

  const getStockAlert = useCallback(
    async () => {
      setStockAlert(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchDetail(
        `stock/stk_alert/${stockCode}/`
      );
      if (!ok)
        return setStockAlert(oState => ({ ...oState, isLoading: false }));
      const stockAlert = getStockAlertFromFetch(payload);
      setStockAlert({ isLoading: false, stockAlert });
    },
    [fetchDetail, getStockAlertFromFetch, stockCode]
  );

  const handleStockAlertSubmit = useCallback(
    async (stockAlert: IStockAlert, formApis: any) => {
      setStockAlert(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchEdit(
        `stock/stk_alert/${stockCode}/`,
        getStockAlertFetch(stockAlert),
        { formApis, method: "PUT" }
      );
      if (!ok) {
        setStockAlert(oState => ({ ...oState, isLoading: false }));
        return false;
      }
      stockAlert = getStockAlertFromFetch(payload);
      setStockAlert({ isLoading: false, stockAlert });
      return true;
    },
    [fetchEdit, getStockAlertFetch, getStockAlertFromFetch, stockCode]
  );

  useEffect(
    () => {
      if (!stockCode) return;
      getStockAlert();
    },
    [getStockAlert, stockCode]
  );

  return { ...stockAlertState, handleStockAlertSubmit };
}

export default useStockAlert;
