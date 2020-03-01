import { useCallback, useEffect, useState } from "react";
import { useListState } from "../Base/Fetches";

interface IStockMaster {
  name: string;
  id: number;
}
interface IStockMasterNameState {
  stockMasterNames: Array<IStockMaster>;
  isLoading: boolean;
}
function useStockMasterNames() {
  const [stockMasterNames, setStockMasterNames] = useState<
    IStockMasterNameState
  >({
    stockMasterNames: [],
    isLoading: true
  });
  const { fetchList } = useListState<IStockMaster>();

  const fetchStockMasterNames = useCallback(
    async () => {
      setStockMasterNames(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchList("stock/stk_master/list/", {
        page_size: 1000
      });
      const stockMasterNames = ok ? payload.results : [];
      setStockMasterNames({ isLoading: false, stockMasterNames });
    },
    [fetchList]
  );
  useEffect(
    () => {
      fetchStockMasterNames();
    },
    [fetchStockMasterNames]
  );
  return { ...stockMasterNames, fetchStockMasterNames };
}

export default useStockMasterNames;
