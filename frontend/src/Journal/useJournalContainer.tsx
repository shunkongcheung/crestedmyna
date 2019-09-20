import { useCallback, useRef, useMemo, useState } from "react";

import useJournalCalendar from "./useJournalCalendar"

interface IPageScrollerRef {
  goToPage: (p: number) => any;
}
type TContentState = "list" | "create" | number;

function useJournalContainer() {
  const [contentState, setContentState] = useState<TContentState>("list");
  const pageScrollerRef = useRef<IPageScrollerRef>();

	const {  events, handleRangeChange } = useJournalCalendar()

  const handleCalendarClick = useCallback((id?: number) => {
    if (!pageScrollerRef.current) return;
    setContentState(id || "create");
    pageScrollerRef.current.goToPage(1);
  }, []);

	const calendarState = useMemo(() => ({
		events,
		handleCalendarClick,
		handleRangeChange,
	}), [
		events,
		handleCalendarClick,
		handleRangeChange,
	])

  return {
		calendarState,
    contentState,
    pageScrollerRef
  };
}

export default useJournalContainer;
