import { useCallback, useState } from "react";
import { useEditState } from "../Base/Fetches";

interface ICCASSPArticipantDetail {
  participantName: string;
  participantId: string;
  shareCount: number;
  sharePercent: number;
  detailDate: Date;
}

interface ICCASSPArticipantDetailState {
  participantDetails: Array<ICCASSPArticipantDetail>;
  isLoading: boolean;
}

interface IFetchSubmit {
  start_date: string;
  end_date: string;
  stock_code: string;
}
interface IDetailRet {
  participant_name: string;
  participant_id: string;
  share_count: number;
  share_percent: number;
  detail_date: Date;
}
interface IFetchRet {
  participant_details: Array<IDetailRet>;
}

function useCCASSParticipantDetails() {
  const [participantDetailsState, setParticipantDetailsState] = useState<
    ICCASSPArticipantDetailState
  >({
    participantDetails: [],
    isLoading: true
  });
  const { fetchEdit } = useEditState<IFetchRet, IFetchSubmit>();

  const fetchParticipantDetails = useCallback(
    async (stock_code: string, start_date: string, end_date: string) => {
      setParticipantDetailsState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchEdit("stock/stk_ccass/", {
        start_date,
        end_date,
        stock_code
      });
      if (!ok) return;

      setParticipantDetailsState({
        isLoading: false,
        participantDetails: payload.participant_details.map(itm => ({
          participantName: itm.participant_name,
          participantId: itm.participant_id,
          shareCount: itm.share_count,
          sharePercent: itm.share_percent,
          detailDate: new Date(itm.detail_date)
        }))
      });
    },
    [fetchEdit]
  );

  return {
    fetchParticipantDetails,
    participantDetailsState
  };
}

export default useCCASSParticipantDetails;
