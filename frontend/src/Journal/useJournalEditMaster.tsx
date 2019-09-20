import { useCallback } from "react";
import { History } from "history";

import { useEditState } from "../Base/Fetches";

interface IJournalMaster {
  name: string;
  description: string;
  id: number;
  location: string;
  medias: Array<{ id: number }>;
  endAt: Date;
  startAt: Date;
}

interface IJournalMasterSubmit {
  name: string;
  description: string;
  id: number;
  location: string;
  medias: Array<number>;
  end_at: string;
  start_at: string;
}

function useJournalEditViewMasterState(history: History) {
  // state - fetch -----------------------------------------
  const { fetchEdit } = useEditState<IJournalMasterSubmit>();

  // methods -----------------------------------------------
  const handleSubmit = useCallback(
    async (data: IJournalMaster, formApis: any) => {
      const submitValues = {
        id: data.id,
        description: data.description,
        end_at: data.endAt.toISOString(),
        location: data.location,
        name: data.name,
        start_at: data.startAt.toISOString(),
        medias: data.medias.map(itm => itm.id)
      };

      const isContainsId = !isNaN(data.id) && data.id > 0;
      const suffix = isContainsId ? data.id : "create";
      const method = isContainsId ? "PUT" : "POST";
      const { ok, payload } = await fetchEdit(
        `journal/jnl_master/${suffix}/`,
        submitValues,
        { formApis, method }
      );
      if (ok) history.push(`/journal/detail/${payload.id}/`);
    },
    [fetchEdit, history]
  );

  // return -------------------------------------------------
  return { handleSubmit };
}

export default useJournalEditViewMasterState;
