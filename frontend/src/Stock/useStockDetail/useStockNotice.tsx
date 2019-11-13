import { useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";

import { useListState } from "../../Base/Fetches";

interface IStockNotice {
  formSerialUrl: string;
  formSerialNumber: string;
  shareholderName: string;
  reasonForDisclosure: string;
  shareCount: number;
  averagePrice: number;
  interestedShare: number;
  sharePercent: number;
  noticeDate: Moment;
  isAssociated: boolean;
  isDebentures: boolean;
}
interface IStockNoticeFetch {
  form_serial_url: string;
  form_serial_number: string;
  shareholder_name: string;
  reason_for_disclosure: string;
  share_count: number;
  average_price: number;
  interested_share: number;
  share_percent: number;
  notice_date: Moment;
  is_associated: boolean;
  is_debentures: boolean;
}

interface ISubstantialStockShareholder {
  formSerialUrl: string;
  formSerialNumber: string;
  shareholderName: string;
  shareCount: number;
  sharePercent: number;
  noticeDate: Moment;
}
interface ISubstantialStockShareholderFetch {
  form_serial_url: string;
  form_serial_number: string;
  shareholder_name: string;
  share_count: number;
  share_percent: number;
  notice_date: Moment;
}

interface IStockNoticeState {
  isLoading: boolean;
  notices: Array<IStockNotice>;
  substantialShareholders: Array<ISubstantialStockShareholder>;
}

function useStockNotice(stockCode: string) {
  const [stockNoticeState, setStockNoticeState] = useState<IStockNoticeState>({
    isLoading: true,
    notices: [],
    substantialShareholders: []
  });

  const { fetchList: fetchNotices } = useListState<IStockNoticeFetch>();
  const { fetchList: fetchSubstantialShareholders } = useListState<
    ISubstantialStockShareholderFetch
  >();

  const fetchStockNotice = useCallback(
    async () => {
      setStockNoticeState(oState => ({ ...oState, isLoading: true }));
      const [noticesRes, substantialRes] = await Promise.all([
        fetchNotices(`stock/stk_notice/${stockCode}/`, { pageSize: 100 }),
        fetchSubstantialShareholders(
          `stock/stk_notice/shareholder/${stockCode}/`,
          { pageSize: 100 }
        )
      ]);
      const ok = noticesRes.ok && substantialRes.ok;
      if (!ok)
        return setStockNoticeState(oState => ({ ...oState, isLoading: false }));
      setStockNoticeState({
        isLoading: false,
        notices: noticesRes.payload.results.map(itm => ({
          formSerialUrl: itm.form_serial_url,
          formSerialNumber: itm.form_serial_number,
          shareholderName: itm.shareholder_name,
          reasonForDisclosure: itm.reason_for_disclosure,
          shareCount: itm.share_count,
          averagePrice: itm.average_price,
          interestedShare: itm.interested_share,
          sharePercent: itm.share_percent,
          noticeDate: moment(itm.notice_date),
          isAssociated: itm.is_associated,
          isDebentures: itm.is_debentures
        })),
        substantialShareholders: substantialRes.payload.results.map(itm => ({
          formSerialUrl: itm.form_serial_url,
          formSerialNumber: itm.form_serial_number,
          shareholderName: itm.shareholder_name,
          shareCount: itm.share_count,
          sharePercent: itm.share_percent,
          noticeDate: moment(itm.notice_date)
        }))
      });
    },
    [fetchNotices, fetchSubstantialShareholders, stockCode]
  );

  useEffect(
    () => {
      if (!stockCode) return;
      fetchStockNotice();
    },
    [fetchStockNotice, stockCode]
  );

  return stockNoticeState;
}

export default useStockNotice;
