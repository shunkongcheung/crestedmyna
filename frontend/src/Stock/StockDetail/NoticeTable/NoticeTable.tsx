import React, { memo, useCallback, useMemo } from "react";
import { Icon, Table, Tooltip } from "antd";
import PropTypes from "prop-types";
import { Moment } from "moment";

import { useGetPrettyNum } from "../../hooks";
import getDisclosureDesc from "./getDisclosureDesc";

import classNames from "./NoticeTable.module.scss";

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
interface INoticeTableProps {
  isLoading: boolean;
  notices: Array<IStockNotice>;
}

function NoticeTable({ isLoading, notices }: INoticeTableProps) {
  const { getPrettyNum } = useGetPrettyNum();

  const renderedReason = useCallback(reasonForDisclosure => {
    return (
      <>
        <span className={classNames.reasonForDisclosureValue}>
          {reasonForDisclosure}
        </span>
        <Tooltip
          title={getDisclosureDesc(reasonForDisclosure)}
          placement="topLeft"
        >
          <Icon type="info-circle" />
        </Tooltip>
      </>
    );
  }, []);
  const renderSerialNum = useCallback(({ formSerialUrl, formSerialNumber }) => {
    return (
      <a href={formSerialUrl} rel="noopener noreferrer" target="_blank">
        {formSerialNumber}
      </a>
    );
  }, []);

  const renderShareCount = useCallback(
    shareCount => {
      if (shareCount < 0) return "";
      return getPrettyNum(shareCount, { toFixedDigit: 0 });
    },
    [getPrettyNum]
  );

  const renderSharePercent = useCallback(
    sharePercent => {
      if (sharePercent < 0) return "";
      return getPrettyNum(sharePercent, { withPercentSign: true });
    },
    [getPrettyNum]
  );

  const renderNoticeDate = useCallback(noticeDate => {
    return noticeDate.format("YYYY/MM/DD");
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "SERIAL NO.",
        dataIndex: "serialNum",
        render: renderSerialNum,
        key: "serialNum"
      },
      {
        title: "SHAREHOLDER NAME",
        dataIndex: "shareholderName",
        key: "shareholderName"
      },
      {
        title: "SHARE NO.",
        dataIndex: "shareCount",
        render: renderShareCount,
        key: "shareCount"
      },
      {
        title: "% OF ISSUED VOTING SHARES",
        dataIndex: "sharePercent",
        render: renderSharePercent,
        key: "sharePercent"
      },
      {
        title: "DATE",
        dataIndex: "noticeDate",
        render: renderNoticeDate,
        key: "noticeDate"
      }
    ],
    [renderNoticeDate, renderSerialNum, renderShareCount, renderSharePercent]
  );

  const keyedData = useMemo(
    () =>
      notices.map((itm, key) => ({
        key,
        ...itm,
        serialNum: {
          formSerialUrl: itm.formSerialUrl,
          formSerialNumber: itm.formSerialNumber
        }
      })),
    [notices]
  );
  return (
    <div className={classNames.container}>
      <Table
        columns={columns}
        dataSource={keyedData}
        loading={isLoading}
        size="small"
      />
    </div>
  );
}

NoticeTable.propTypes = {};
export default memo(NoticeTable);
