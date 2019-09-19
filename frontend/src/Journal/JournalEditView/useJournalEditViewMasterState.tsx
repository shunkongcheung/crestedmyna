import { useCallback, useEffect, useState } from "react";
import { History } from "history";

import { useDetailState, useEditState } from "../../Base/Fetches";
import { useGetIdOrCreateState } from "../../Base/Utils";

function useJournalEditViewMasterState(history: History) {
  // props -------------------------------------------------
  const journalMasterId = useGetIdOrCreateState(/journal\/edit\/(\w+)/);

  // state -------------------------------------------------
  const isAuthenticated = true;
  interface IJournalMasterBase {
    name: string;
    description: string;
    id: number;
    location: string;
  }

  // state - detail ----------------------------------------
  interface IMediaRet {
    id: number;
    name: string;
    access_url: string;
  }
  interface IJournalMasterRet extends IJournalMasterBase {
    medias: Array<IMediaRet>;
    end_at: string;
    start_at: string;
  }
  const { fetchDetail } = useDetailState<IJournalMasterRet>(isAuthenticated);

  // state - fetch -----------------------------------------
  interface IJournalMasterSubmit extends IJournalMasterBase {
    medias: Array<number>;
    end_at: string;
    start_at: string;
  }
  const method = journalMasterId === "create" ? "POST" : "PUT";
  const { fetchEdit } = useEditState<IJournalMasterSubmit>(
    isAuthenticated,
    method
  );

  // state - edit ------------------------------------------
  interface IMedia {
    accessUrl: string;
    name: string;
    id: number;
  }
  interface IJournalMaster extends IJournalMasterBase {
    medias: Array<IMedia>;
    endAt: Date;
    startAt: Date;
  }
  const [journalMaster, setJournalMaster] = useState<IJournalMaster>({
    name: "",
    description: "",
    endAt: new Date(),
    id: -1,
    location: "",
    medias: [],
    startAt: new Date()
  });
  const [isFetchingInit, setIsFetchingInit] = useState<boolean>(
    journalMasterId !== "create"
  );

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
      const {
        ok,
        payload: { id: editId }
      } = await fetchEdit(
        `journal/jnl_master/${journalMasterId}/`,
        submitValues,
        formApis
      );
      if (ok) history.push(`/journal/${editId}/`);
    },
    [fetchEdit, history, journalMasterId]
  );
  const initJournalMaster = useCallback(
    async () => {
      const ret = await fetchDetail(`journal/jnl_master/${journalMasterId}/`);
      const { ok, payload } = ret;
      if (!ok) return;

      const journalMaster: IJournalMaster = {
        ...payload,
        medias: payload.medias.map(itm => ({
          id: itm.id,
          accessUrl: itm.access_url,
          name: itm.name
        })),
        endAt: new Date(payload.end_at),
        startAt: new Date(payload.start_at)
      };
      setJournalMaster(journalMaster);
      setIsFetchingInit(false);
    },
    [fetchDetail, journalMasterId, setIsFetchingInit]
  );

  // life cycle --------------------------------------------
  useEffect(
    () => {
      if (journalMasterId === "create") return;
      initJournalMaster();
    },
    [initJournalMaster, journalMasterId]
  );

  // return -------------------------------------------------
  return {
    journalMaster,
    handleSubmit,
    isFetchingInit
  };
}

export default useJournalEditViewMasterState;
