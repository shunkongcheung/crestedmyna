import { useCallback, useState, useEffect } from "react";
import useDetailState from "../base/Fetches/useDetailState";

function useJournalDetailViewState() {
  interface IJournalMasterBase {
    name: string;
    description: string;
  }
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

  const isAuthenticated = true;
  const { fetchDetail } = useDetailState<IJournalMasterRet>(isAuthenticated);

  interface IMedia {
    src: string;
    name: string;
  }
  interface IJournalMaster extends IJournalMasterBase {
    medias: Array<IMedia>;
    end_at: Date;
    start_at: Date;
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
        medias: payload.medias.map(itm => ({
          src: itm.access_url,
          name: itm.name
        })),
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
