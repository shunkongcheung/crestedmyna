import { useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";

import { useListState } from "../../Base/Fetches";

interface IStockNewsItem {
  documentLink: string;
  releaseTime: Moment;
  headline: string;
}
interface IStockNewsItemFetch {
  document_link: string;
  release_time: string;
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
          releaseTime: moment(itm.release_time),
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
