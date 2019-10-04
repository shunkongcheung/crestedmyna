import { useCallback, useEffect, useState } from "react";
import { History } from "history";

type TPage = "detail" | "portfolio" | "txes";

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
    if (pathname.includes("portfolio")) setPage("portfolio");
    if (pathname.includes("txes")) setPage("txes");
    else setPage("detail");
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
