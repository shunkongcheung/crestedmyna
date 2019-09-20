import { useCallback, useEffect, useState } from "react";
import { useEditState } from "../Base/Fetches";

// store values ---------------------------------
interface IHeadline {
  author?: string;
  description: string;
  publishAt: Date;
  title: string;
  thumbnail: string;
  url: string;
}
interface INewsState {
  headlines: Array<IHeadline>;
}

// fetch values ---------------------------------
interface IHeadlineRet {
  author?: string;
  description: string;
  publish_at: string;
  title: string;
  thumbnail: string;
  url: string;
}
interface IFetchRet {
  headlines: Array<IHeadlineRet>;
}

interface IFetchSubmit {
  category?: string;
  country?: string;
  language?: string;
  q?: string;
}

function useHmeNews() {
  const { fetchEdit } = useEditState<IFetchRet, IFetchSubmit>();
  const [newsState, setNewsState] = useState<INewsState>({ headlines: [] });

  // methods -------------------------------------
  const initNewsState = useCallback(
    async () => {
      const { ok, payload } = await fetchEdit("home/hme_news/headlines/", {});
      if (!ok) return;
      setNewsState(() => ({
        headlines: payload.headlines.map(itm => ({
          author: itm.author,
          description: itm.description,
          publishAt: new Date(itm.publish_at),
          title: itm.title,
          thumbnail: itm.thumbnail,
          url: itm.url
        }))
      }));
    },
    [fetchEdit]
  );

  useEffect(
    () => {
      initNewsState();
    },
    [initNewsState]
  );

  return newsState;
}

export default useHmeNews;
