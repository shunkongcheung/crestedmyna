import { useCallback, useEffect, useState } from "react";
import { Moment } from "moment";
import { useListState } from "../Base/Fetches";

interface IEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}
interface IEventRet {
  id: number;
  name: string;
  allDay: false;
  start_at: string;
  end_at: string;
}

function useJournalListViewState() {
  const { fetchList } = useListState<IEventRet>();
  const [events, setEvents] = useState<Array<IEvent>>([]);

  const handleRangeChange = useCallback(
    async (date__gte?: Moment, date__lte?: Moment) => {
      const queryParams: { [x: string]: string } = {};
      if (date__gte) queryParams.date__gte = date__gte.format("YYYY-MM-DD");
      if (date__lte) queryParams.date__lte = date__lte.format("YYYY-MM-DD");
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

  const insertEvent = useCallback((event: IEvent) => {
    setEvents(oEvents => [...oEvents, event]);
  }, []);

  useEffect(
    () => {
      handleRangeChange();
    },
    [handleRangeChange]
  );

  return { events, handleRangeChange, insertEvent };
}

export default useJournalListViewState;
