import { useCallback, useMemo, useState } from "react";

import useJournalCalendar from "./useJournalCalendar";
import useJournalDetail from "./useJournalDetail";
import useJournalEdit from "./useJournalEdit";

type TContentState = "detail" | "create" | "edit" | undefined;

function useJournalContainer() {
  const [contentState, setContentState] = useState<TContentState>();

  const { events, handleRangeChange } = useJournalCalendar();
  const { journalMaster, fetchJournalMaster } = useJournalDetail();
  const { handleAddMedia, handleDeleteMedia, handleSubmit } = useJournalEdit();

  // method ----------------------------------------------------
  const handleCalendarClick = useCallback(
    (id?: number) => {
      if (id) {
        fetchJournalMaster(id);
        setContentState("detail");
      } else {
        setContentState("create");
      }
    },
    [fetchJournalMaster]
  );

  // return ------------------------------------------------------
  const calendarState = useMemo(
    () => ({
      events,
      handleCalendarClick,
      handleRangeChange
    }),
    [events, handleCalendarClick, handleRangeChange]
  );
  const editState = useMemo(
    () => ({
      journalMaster,
      handleAddMedia,
      handleDeleteMedia,
      handleSubmit
    }),
    [journalMaster, handleAddMedia, handleDeleteMedia, handleSubmit]
  );

  return {
    calendarState,
    contentState,
    editState,
    journalMaster
  };
}

export default useJournalContainer;
