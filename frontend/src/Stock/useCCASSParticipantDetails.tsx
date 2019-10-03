import { useCallback, useState } from "react";
import { useEditState } from "../Base/Fetches";

interface IDetailSum {
  detailDate: Date;
  totalShareCount: number;
  totalSharePercent: number;
}
interface ICCASSPArticipantDetail {
  detailDate: Date;
  participantName: string;
  participantId: string;
  shareCount: number;
  sharePercent: number;
}
interface ICCASSPArticipantDetailState {
  detailSums: Array<IDetailSum>;
  isLoading: boolean;
  participantDetailsMap: { [x: string]: Array<ICCASSPArticipantDetail> };
}

interface IFetchSubmit {
  end_date: string;
  start_date: string;
  stock_code: string;
}
interface IDetailRet {
  detail_date: string;
  participant_name: string;
  participant_id: string;
  share_count: number;
  share_percent: number;
}
interface ISumRet {
  detail_date: Date;
  total_share_count: number;
  total_share_percent: number;
}
interface IFetchRet {
  participant_details: Array<IDetailRet>;
  detail_sums: Array<ISumRet>;
}

function useCCASSParticipantDetails() {
  const [participantDetailsState, setParticipantDetailsState] = useState<
    ICCASSPArticipantDetailState
  >({
    participantDetailsMap: {},
    detailSums: [],
    isLoading: true
  });
  const { fetchEdit } = useEditState<IFetchRet, IFetchSubmit>();

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
      return relatedParticipantDetails.map(itm => ({
        participantName: itm.participant_name,
        participantId: itm.participant_id,
        shareCount: itm.share_count,
        sharePercent: itm.share_percent,
        detailDate: new Date(itm.detail_date)
      }));
      /* return getNumArray( */
      /*   relatedParticipantDetails, */
      /*   "share_percent", */
      /*   "detail_date", */
      /*   startDate, */
      /*   endDate */
      /* ); */
    },
    []
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
        [x: string]: Array<ICCASSPArticipantDetail>;
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

      const detailSums = payload.detail_sums.map(itm => ({
        detailDate: new Date(itm.detail_date),
        totalShareCount: itm.total_share_count,
        totalSharePercent: itm.total_share_percent
      }));
      /* const detailSums = getNumArray( */
      /*   payload.detail_sums, */
      /*   "total_share_percent", */
      /*   "detail_date", */
      /*   startDate, */
      /*   endDate */
      /* ); */
      setParticipantDetailsState({
        isLoading: false,
        participantDetailsMap,
        detailSums
      });
    },
    [
      fetchEdit,
      getShareCountDataFromParticipantDetails,
      getUniqueParticipantNames
    ]
  );

  return {
    fetchParticipantDetails,
    participantDetailsState
  };
}

export default useCCASSParticipantDetails;
