import { useCallback, useEffect, useMemo, useState } from "react";
import { useListState } from "../Base/Fetches";

interface IStockMaster {
  name: string;
  id: number;
}
interface IStockMastersState {
  stockMasters: Array<IStockMaster>;
  isLoading: boolean;
}

function useStockMasters() {
  const [stockMastersState, setStockMastersState] = useState<
    IStockMastersState
  >({
    stockMasters: [],
    isLoading: true
  });
  const { fetchList } = useListState<IStockMaster>();

  // methods ----------------------------------------------
  const fetchStockMasters = useCallback(
    async () => {
      setStockMastersState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchList("stock/stk_master/list/", {
        page_size: 1000
      });
      if (!ok)
        return setStockMastersState(oState => ({
          ...oState,
          isLoading: false
        }));

      setStockMastersState({ stockMasters: payload.results, isLoading: false });
    },
    [fetchList]
  );

  // life cycle -------------------------------------------
  useEffect(
    () => {
      fetchStockMasters();
    },
    [fetchStockMasters]
  );

  // return -----------------------------------------------
  return {
    stockMastersState,
    fetchStockMasters
  };
}

export default useStockMasters;
