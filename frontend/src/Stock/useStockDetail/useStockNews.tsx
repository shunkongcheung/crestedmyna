import { useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";

import { useListState } from "../../Base/Fetches";

interface IStockNewsItem {
  documentLink: string;
  releaseDate: Moment;
  headline: string;
}
interface IStockNewsItemFetch {
  document_link: string;
  release_date: string;
  headline: string;
}

interface IStockNewsState {
  stockNews: Array<IStockNewsItem>;
  isLoading: boolean;
}

function useStockNews(stockCode: string) {
  const [stockNewsState, setStockNewsState] = useState<IStockNewsState>({
    stockNews: [],
    isLoading: true
  });

  const { fetchList } = useListState<IStockNewsItemFetch>();

  const fetchStockNews = useCallback(
    async () => {
      setStockNewsState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchList(`stock/stk_news/${stockCode}/`, {
        page_size: 1000
      });
      if (!ok)
        return setStockNewsState(oState => ({ ...oState, isLoading: false }));
      setStockNewsState({
        isLoading: false,
        stockNews: payload.results.map(itm => ({
          documentLink: itm.document_link,
          releaseDate: moment(itm.release_date),
          headline: itm.headline
        }))
      });
    },
    [fetchList, stockCode]
  );

  useEffect(
    () => {
      if (!stockCode) return;
      fetchStockNews();
    },
    [fetchStockNews, stockCode]
  );

  return stockNewsState;
}

export default useStockNews;
