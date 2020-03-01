import { useCallback, useEffect, useState } from "react";
import { History } from "history";

function useJournalContent(
  history: History,
  fetchJournalMaster: (id: number) => any,
  resetJournalMaster: () => any
) {
  type TContentState = "detail" | "edit" | "list";
  const [contentState, setContentState] = useState<TContentState>("list");

  const fetchJournalMasterFromPathname = useCallback(
    (pathname, fetchType: "detail" | "edit") => {
      const regExp = fetchType === "detail" ? /detail\/(\w+)/ : /edit\/(\w+)/;
      const matches = pathname.match(regExp);
      if (!Array.isArray(matches) || matches.length <= 0) return;
      const id = Number(matches[1]) as number;
      fetchJournalMaster(id);
      setContentState(fetchType);
    },
    [fetchJournalMaster]
  );

  const setContentStateOnHistoryChange = useCallback(
    location => {
      const { pathname } = location;
      if (pathname.includes("detail"))
        fetchJournalMasterFromPathname(pathname, "detail");
      else if (pathname.includes("edit"))
        fetchJournalMasterFromPathname(pathname, "edit");
      else if (pathname.includes("create")) setContentState("edit");
      else {
        setContentState("list");
        resetJournalMaster();
      }
    },
    [fetchJournalMasterFromPathname, resetJournalMaster]
  );

  useEffect(
    () => {
      const unlisten = history.listen(setContentStateOnHistoryChange);
      setContentStateOnHistoryChange(window.location);
      return () => {
        unlisten();
      };
    },
    [history, setContentStateOnHistoryChange]
  );

  return contentState;
}

export default useJournalContent;
