import { useCallback, useState, useEffect } from "react";
import useDetailState from "../base/Fetches/useDetailState";

function useJournalDetailViewState() {
  interface IJournalMasterBase {
    name: string;
    description: string;
    medias: Array<IMedia>;
  }
  interface IJournalMasterRet extends IJournalMasterBase {
    end_at: string;
    start_at: string;
  }
  interface IJournalMaster extends IJournalMasterBase {
    end_at: Date;
    start_at: Date;
  }

  const isAuthenticated = true;
  const { fetchDetail } = useDetailState<IJournalMasterRet>(isAuthenticated);

  interface IMedia {
    id: number;
    access_url: string;
  }
  const [journalMaster, setJournalMaster] = useState<IJournalMaster>({
    name: "",
    description: "",
    medias: [],
    end_at: new Date(),
    start_at: new Date()
  });

  const initJournalMaster = useCallback(
    async () => {
      const { pathname } = window.location;
      const matches = pathname.match(/journal\/(\w+)/);
      if (!Array.isArray(matches) || matches.length <= 0) return;

      const id = Number(matches[1]) as number;
      const ret = await fetchDetail(`journal/jnl_master/${id}/`);
      const { ok, payload } = ret;
      if (!ok) return;

      const journalMaster: IJournalMaster = {
        ...payload,
        end_at: new Date(payload.end_at),
        start_at: new Date(payload.start_at)
      };
      setJournalMaster(journalMaster);
    },
    [fetchDetail]
  );

  useEffect(
    () => {
      initJournalMaster();
    },
    [initJournalMaster]
  );

  return { journalMaster };
}

export default useJournalDetailViewState;
