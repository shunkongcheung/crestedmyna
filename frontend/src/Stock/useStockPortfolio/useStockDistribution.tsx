import { useCallback, useEffect, useState } from "react";

import { useEditState } from "../../Base/Fetches";

interface IStockDistributionItem {
  sectorName: string;
  value: number;
}
interface IStockDistributionState {
  isLoading: boolean;
  stockCountDistributionItems: Array<IStockDistributionItem>;
  stockRealizedValueDistributionItems: Array<IStockDistributionItem>;
  stockUnrealizedValueDistributionItems: Array<IStockDistributionItem>;
}

interface IStockDistributionItemRet {
  sector_name: string;
  value: number;
}
interface IStockDistributionRet {
  count_distributions: Array<IStockDistributionItemRet>;
  realized_value_distributions: Array<IStockDistributionItemRet>;
  unrealized_value_distributions: Array<IStockDistributionItemRet>;
}
function useStockDistribution() {
  const [stockDistributionState, setStockDistributionState] = useState<
    IStockDistributionState
  >({
    isLoading: true,
    stockCountDistributionItems: [],
    stockRealizedValueDistributionItems: [],
    stockUnrealizedValueDistributionItems: []
  });

  const { fetchEdit } = useEditState<IStockDistributionRet, {}>();

  const getRetToStateMappedArray = useCallback(
    (retArr: Array<IStockDistributionItemRet>) =>
      retArr.map(itm => ({ sectorName: itm.sector_name, value: itm.value })),
    []
  );

  const initDistribution = useCallback(
    async () => {
      setStockDistributionState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchEdit(
        "stock/stk_portfolio/distribution/",
        {}
      );
      if (!ok)
        return setStockDistributionState(oState => ({
          ...oState,
          isLoading: false
        }));
      const {
        count_distributions,
        realized_value_distributions,
        unrealized_value_distributions
      } = payload;
      setStockDistributionState({
        isLoading: false,
        stockCountDistributionItems: getRetToStateMappedArray(
          count_distributions
        ),
        stockRealizedValueDistributionItems: getRetToStateMappedArray(
          realized_value_distributions
        ),
        stockUnrealizedValueDistributionItems: getRetToStateMappedArray(
          unrealized_value_distributions
        )
      });
    },
    [fetchEdit, getRetToStateMappedArray]
  );

  useEffect(
    () => {
      initDistribution();
    },
    [initDistribution]
  );

  return { ...stockDistributionState, initDistribution };
}

export default useStockDistribution;
