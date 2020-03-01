import { useCallback, useEffect, useState } from "react";
import { useEditState, useListState } from "../../Base/Fetches";

interface IStockSector {
  name: string;
  id: number;
}
interface IStockMaster {
  id: number;
  stockCode: string;
  sector: number;
}
interface IStockSectorsState {
  isLoading: boolean;
  sectors: Array<IStockSector>;
}

function useStockSectors(stockMaster: IStockMaster) {
  const [stockSectors, setStockSectors] = useState<IStockSectorsState>({
    isLoading: true,
    sectors: []
  });
  const { fetchEdit } = useEditState();
  const { fetchList } = useListState<IStockSector>();

  const handleStockSectorChange = useCallback(
    async (sector: number) =>
      fetchEdit(
        `stock/stk_master/${stockMaster.id}/`,
        { stock_code: stockMaster.stockCode, sector },
        { method: "PUT" }
      ),
    [fetchEdit, stockMaster]
  );

  const fetchStockSectors = useCallback(
    async () => {
      setStockSectors(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchList("stock/stk_sector/list/", {
        page: 1,
        page_size: 100
      });
      if (!ok)
        return setStockSectors(oState => ({ ...oState, isLoading: false }));
      setStockSectors({ sectors: payload.results, isLoading: false });
    },
    [fetchList]
  );

  useEffect(
    () => {
      fetchStockSectors();
    },
    [fetchStockSectors]
  );

  return { ...stockSectors, handleStockSectorChange };
}

export default useStockSectors;
