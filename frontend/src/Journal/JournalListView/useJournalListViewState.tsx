import { useCallback, useEffect, useState } from "react";
import { History } from "history";

import { useListState } from "../../Base/Fetches";

function useJournalListViewState(history: History) {
  interface IJournalMaster {
    id: number;
    name: string;
    allDay: false;
    start_at: string;
    end_at: string;
  }
  const isAuthenticated = true;
  const { fetchList } = useListState<IJournalMaster>(isAuthenticated);

  interface IEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
  }
  const [events, setEvents] = useState<Array<IEvent>>([]);

  const handleAdd = useCallback(
    () => {
      history.push(`/journal/create/`);
    },
    [history]
  );

  const handleRangeChange = useCallback(
    async (date__gte?: Date, date__lte?: Date) => {
      const queryParams = { date__gte, date__lte };
      const ret = await fetchList("journal/jnl_master/list/", queryParams);
      const { ok, payload } = ret;
      if (!ok) return;
      const { results } = payload;
      setEvents(
        results.map(itm => ({
          id: itm.id,
          title: itm.name,
          start: new Date(itm.start_at),
          end: new Date(itm.end_at)
        }))
      );
    },
    [fetchList]
  );

  const handleEventClick = useCallback(
    id => {
      history.push(`/journal/${id}/`);
    },
    [history]
  );

  useEffect(
    () => {
      handleRangeChange();
    },
    [handleRangeChange]
  );

  return { events, handleAdd, handleRangeChange, handleEventClick };
}

export default useJournalListViewState;
