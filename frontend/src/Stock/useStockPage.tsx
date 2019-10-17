import { useCallback, useEffect, useState } from "react";
import { History } from "history";

type TPage = "ccassTrend" | "detail" | "portfolio" | "txes";

function useStockPage(history: History) {
  const [page, setPage] = useState<TPage>("detail");

  const handleTabChange = useCallback(
    activeKey => {
      history.push(`/stock/${activeKey}`);
    },
    [history]
  );

  const setPageOnHistoryChange = useCallback(location => {
    const { pathname } = location;
    if (pathname.includes("detail")) setPage("detail");
    else if (pathname.includes("txes")) setPage("txes");
    else if (pathname.includes("ccassTrend")) setPage("ccassTrend");
    else setPage("portfolio");
  }, []);

  useEffect(
    () => {
      const unlisten = history.listen(setPageOnHistoryChange);
      setPageOnHistoryChange(history.location);
      return () => {
        unlisten();
      };
    },
    [history, setPageOnHistoryChange]
  );

  return { handleTabChange, page };
}

export default useStockPage;
