import { useCallback, useMemo } from "react";
import { History } from "history";

import useJournalCalendar from "./useJournalCalendar";
import useJournalContent from "./useJournalContent";
import useJournalDetail from "./useJournalDetail";
import useJournalEdit from "./useJournalEdit";

type TContentState = "detail" | "create" | "edit" | "list";

function useJournalContainer(history: History) {
  const { events, handleRangeChange, insertEvent } = useJournalCalendar();
  const {
    journalMaster,
    fetchJournalMaster,
    resetJournalMaster
  } = useJournalDetail();
  const { handleAddMedia, handleDeleteMedia, handleSubmit } = useJournalEdit(
		history,
		insertEvent
  );
  const contentState = useJournalContent(
    history,
    fetchJournalMaster,
    resetJournalMaster
  );

  // method ----------------------------------------------------
  const handleDetailBack = useCallback(
    () => {
      history.push(`/journal/list/`);
    },
    [history]
  );

  const handleCalendarClick = useCallback(
    (id?: number) => {
      if (id) {
        history.push(`/journal/detail/${id}/`);
      } else {
        history.push("/journal/create/");
      }
    },
    [history]
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
  const detailState = useMemo(
    () => ({
      handleDetailBack,
      journalMaster
    }),
    [handleDetailBack, journalMaster]
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
    detailState,
    editState
  };
}

export default useJournalContainer;
