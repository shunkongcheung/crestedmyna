import { useCallback, useState } from "react";
import { useEditState } from "../Base/Fetches";

import useGetNumArray from "./useGetNumArray";

interface ICCASSPArticipantDetailState {
  participantDetailsMap: { [x: string]: Array<number> };
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
    participantDetailsMap: {},
    isLoading: true
  });
  const { fetchEdit } = useEditState<IFetchRet, IFetchSubmit>();
  const { getNumArray } = useGetNumArray();

  const getUniqueParticipantNames = useCallback(
    (participantDetails: Array<IDetailRet>) => {
      const participantNames: Array<string> = participantDetails.map(
        itm => itm.participant_name
      );
      return Array.from(new Set(participantNames));
    },
    []
  );

  const getShareCountDataFromParticipantDetails = useCallback(
    (
      participantDetails: Array<IDetailRet>,
      participantName: string,
      startDate: Date,
      endDate: Date
    ) => {
      let relatedParticipantDetails = participantDetails.filter(
        itm => itm.participant_name === participantName
      );
      return getNumArray(
        relatedParticipantDetails,
        "share_count",
        "detail_date",
        startDate,
        endDate
      );
    },
    [getNumArray]
  );

  const fetchParticipantDetails = useCallback(
    async (stock_code: string, start_date: string, end_date: string) => {
      setParticipantDetailsState(oState => ({ ...oState, isLoading: true }));
      const { ok, payload } = await fetchEdit("stock/stk_ccass/", {
        start_date,
        end_date,
        stock_code
      });
      if (!ok) return;

      const uniqueNames = getUniqueParticipantNames(
        payload.participant_details
      );

      const participantDetailsMap: {
        [x: string]: Array<number>;
      } = {};
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      for (let uniqueName of uniqueNames) {
        participantDetailsMap[
          uniqueName
        ] = getShareCountDataFromParticipantDetails(
          payload.participant_details,
          uniqueName,
          startDate,
          endDate
        );
      }

      setParticipantDetailsState({
        isLoading: false,
        participantDetailsMap
      });
    },
    [
      fetchEdit,
      getUniqueParticipantNames,
      getShareCountDataFromParticipantDetails
    ]
  );

  return {
    fetchParticipantDetails,
    participantDetailsState
  };
}

export default useCCASSParticipantDetails;
