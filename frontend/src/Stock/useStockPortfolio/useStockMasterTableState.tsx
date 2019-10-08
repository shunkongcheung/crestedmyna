import { useCallback, useEffect, useState } from "react";
import { useDetailState, useListState } from "../../Base/Fetches";

type TOrderBy =
  | "marketValue"
  | "name"
  | "realizedValue"
  | "stockCode"
  | "shareCount"
  | "unrealizedValue";

interface IOrderParams {
  ordering: TOrderBy;
  isAscend: boolean;
}

interface IStockMaster {
  name: string;
  sector: number;
  stockCode: string;
  shareCount: number;
  marketPrice: number;
  marketValue: number;
  realizedValue: number;
  turnover: number;
  unrealizedCost: number;
  unrealizedValue: number;
}
interface IStockMasterRet {
  name: string;
  sector: number;
  stock_code: string;
  share_count: number;
  market_price: number;
  market_value: number;
  realized_value: number;
  turnover: number;
  unrealized_cost: number;
  unrealized_value: number;
}

interface IStockMasterTableState {
  stockMasters: Array<IStockMaster>;
  isLoading: boolean;
  page: number;
  total: number;
}
interface IQueryParams {
  page: number;
  ordering?: string;
  sector__in?: string;
}

function useStockMasterTableState(sectors: Array<number>) {
  const [stockMasterTable, setStockMasterTable] = useState<
    IStockMasterTableState
  >({
    stockMasters: [],
    isLoading: true,
    page: 1,
    total: 1
  });
  const { fetchDetail } = useDetailState<IStockMasterRet>();
  const { fetchList } = useListState<{ id: number }>();

  const getQueryOrdering = useCallback((orderParams: IOrderParams) => {
    const { ordering, isAscend } = orderParams;
    const underscoreOrdering = ordering.replace(/([A-Z])/g, function(x, y) {
      return "_" + y.toLowerCase();
    });
    return isAscend ? underscoreOrdering : `-${underscoreOrdering}`;
  }, []);

  const getQueryParams = useCallback(
    (page: number, orderParams?: IOrderParams) => {
      const params: IQueryParams = { page };
      if (orderParams) params.ordering = getQueryOrdering(orderParams);

      if (Array.isArray(sectors) && sectors.length)
        params.sector__in = sectors.join(",");

      return params;
    },
    [getQueryOrdering, sectors]
  );

  const fetchStockMasterIds = useCallback(
    async (page: number, orderParams?: IOrderParams) => {
      const params = getQueryParams(page, orderParams);
      const { ok, payload } = await fetchList("stock/stk_master/list/", params);
      return ok
        ? {
            stockMasterIds: payload.results.map(itm => itm.id),
            total: payload.count
          }
        : { stockMasterIds: [], total: 0 };
    },
    [fetchList, getQueryParams]
  );
  const fetchStockMasterDetail = useCallback(
    async (stockMasterId: number): Promise<undefined | IStockMaster> => {
      const { ok, payload } = await fetchDetail(
        `stock/stk_master/${stockMasterId}/`
      );

      if (!ok) return undefined;
      return {
        sector: payload.sector,
        stockCode: payload.stock_code,
        name: payload.name,
        shareCount: payload.share_count,
        marketPrice: payload.market_price,
        marketValue: payload.market_value,
        realizedValue: payload.realized_value,
        turnover: payload.turnover,
        unrealizedCost: payload.unrealized_cost,
        unrealizedValue: payload.unrealized_value
      };
    },
    [fetchDetail]
  );

  const handleListChange = useCallback(
    async (page: number, orderParams?: IOrderParams) => {
      setStockMasterTable(oState => ({ ...oState, isLoading: true }));
      const { stockMasterIds, total } = await fetchStockMasterIds(
        page,
        orderParams
      );
      const stockMastersWithUndefined = await Promise.all(
        stockMasterIds.map(fetchStockMasterDetail)
      );
      const stockMasters = stockMastersWithUndefined.filter(
        itm => itm !== undefined
      ) as Array<IStockMaster>;

      setStockMasterTable({ isLoading: false, stockMasters, page, total });
    },
    [fetchStockMasterIds, fetchStockMasterDetail]
  );

  useEffect(
    () => {
      handleListChange(1);
    },
    [handleListChange]
  );
  return { ...stockMasterTable, handleListChange };
}

export default useStockMasterTableState;
