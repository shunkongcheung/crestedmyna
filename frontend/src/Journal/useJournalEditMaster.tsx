import { useCallback } from "react";

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

function useJournalEditViewMasterState() {
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

      const suffix = !isNaN(data.id) && data.id > 0 ? data.id : "create";
      const { ok, payload } = await fetchEdit(
        `journal/jnl_master/${suffix}/`,
        submitValues,
        formApis
      );
      return ok ? payload.id : undefined;
    },
    [fetchEdit]
  );

  // return -------------------------------------------------
  return { handleSubmit };
}

export default useJournalEditViewMasterState;
