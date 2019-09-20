import { useCallback, useRef, useMemo, useState } from "react";

import useJournalCalendar from "./useJournalCalendar";
import useJournalDetail from "./useJournalDetail";

interface IPageScrollerRef {
  goToPage: (p: number) => any;
}
type TContentState = "detail" | "create" | "edit" | undefined;

function useJournalContainer() {
  const [contentState, setContentState] = useState<TContentState>();
  const pageScrollerRef = useRef<IPageScrollerRef>();

  const { events, handleRangeChange } = useJournalCalendar();
  const { journalMaster, fetchJournalMaster } = useJournalDetail();

  const handleCalendarClick = useCallback(
    (id?: number) => {
      if (!pageScrollerRef.current) return;

      if (id) {
        fetchJournalMaster(id);
        setContentState("detail");
      } else {
        setContentState("create");
      }
      pageScrollerRef.current.goToPage(1);
    },
    [fetchJournalMaster]
  );

  const calendarState = useMemo(
    () => ({
      events,
      handleCalendarClick,
      handleRangeChange
    }),
    [events, handleCalendarClick, handleRangeChange]
  );

  return {
    calendarState,
    contentState,
    journalMaster,
    pageScrollerRef
  };
}

export default useJournalContainer;
