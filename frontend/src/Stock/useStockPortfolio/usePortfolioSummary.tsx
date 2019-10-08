import { useCallback, useEffect, useState } from "react";

import { useEditState } from "../../Base/Fetches";

interface IPortfolioSummary {
  isLoading: boolean;
  marketValue: number;
  realizedValue: number;
  sectors: Array<number>;
  unrealizedValue: number;
}
interface IPortfolioSummaryRet {
  market_value: number;
  realized_value: number;
  unrealized_value: number;
}
interface IPortfolioSummarySubmit {
  sectors?: Array<number>;
}

function usePortfolioSummary() {
  const [portfolioSummary, setPortfolioSummary] = useState<IPortfolioSummary>({
    isLoading: true,
    marketValue: -1,
    realizedValue: -1,
    sectors: [],
    unrealizedValue: -1
  });
  const { fetchEdit } = useEditState<
    IPortfolioSummaryRet,
    IPortfolioSummarySubmit
  >();

  const handleSectorsChange = useCallback(
    async (sectors: Array<number>) => {
      setPortfolioSummary(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchEdit("stock/stk_portfolio/summary/", {
        sectors
      });
      if (!ok)
        return setPortfolioSummary(oState => ({ ...oState, isLoading: false }));

      setPortfolioSummary({
        isLoading: false,
        marketValue: payload.market_value,
        realizedValue: payload.realized_value,
        sectors,
        unrealizedValue: payload.unrealized_value
      });
    },
    [fetchEdit]
  );

  useEffect(
    () => {
      handleSectorsChange([]);
    },
    [handleSectorsChange]
  );

  return { ...portfolioSummary, handleSectorsChange };
}

export default usePortfolioSummary;
