import { useCallback, useContext, useState } from "react";

import { useDetailState } from "../Base/Fetches";
import { AuthContext } from "../Base/Contexts";

interface IJournalMasterBase {
  name: string;
  description: string;
  id: number;
  location: string;
}

// state ----------------------------------------------
interface IMedia {
  id: number;
  accessUrl: string;
  name: string;
}
interface IJournalMaster extends IJournalMasterBase {
  medias: Array<IMedia>;
  endAt: Date;
  startAt: Date;
}

// fetch ----------------------------------------------
interface IMediaRet {
  id: number;
  name: string;
  file_name: string;
}
interface IJournalMasterRet extends IJournalMasterBase {
  medias: Array<IMediaRet>;
  end_at: string;
  start_at: string;
}

function useJournalDetailViewState() {
  /* const journalMasterId = useGetIdOrCreateState(/journal\/(\w+)/); */

  const { token: authToken } = useContext(AuthContext);
  const getDefaultJournalMaster = useCallback(
    () => ({
      name: "",
      description: "",
      endAt: new Date(),
      id: -1,
      location: "",
      medias: [],
      startAt: new Date()
    }),
    []
  );

  const { fetchDetail } = useDetailState<IJournalMasterRet>();

  const [journalMaster, setJournalMaster] = useState<IJournalMaster>(
    getDefaultJournalMaster()
  );

  const fetchJournalMaster = useCallback(
    async (journalMasterId: number) => {
      const ret = await fetchDetail(`journal/jnl_master/${journalMasterId}/`);
      const { ok, payload } = ret;
      if (!ok) return;

      const journalMaster: IJournalMaster = {
        ...payload,
        medias: payload.medias.map(itm => {
          const accessUrl = `/api/general/gnl_media/resolve/${
            itm.file_name
          }?auth=${authToken}`;
          return {
            id: itm.id,
            accessUrl,
            name: itm.name
          };
        }),
        endAt: new Date(payload.end_at),
        startAt: new Date(payload.start_at)
      };
      setJournalMaster(journalMaster);
    },
    [authToken, fetchDetail]
  );

  const resetJournalMaster = useCallback(
    () => {
      setJournalMaster(getDefaultJournalMaster());
    },
    [getDefaultJournalMaster]
  );

  return { journalMaster, fetchJournalMaster, resetJournalMaster };
}

export default useJournalDetailViewState;
