import React, { memo, useCallback, useMemo } from "react";
import { Table } from "antd";
import { Moment } from "moment";

import { useGetPrettyNum } from "../../hooks";

import classNames from "./ShareholderTable.module.scss";

interface ISubstantialShareholder {
  formSerialUrl: string;
  formSerialNumber: string;
  shareholderName: string;
  shareCount: number;
  sharePercent: number;
  noticeDate: Moment;
}
interface IShareholderTableProps {
  isLoading: boolean;
  substantialShareholders: Array<ISubstantialShareholder>;
}

function ShareholderTable({
  isLoading,
  substantialShareholders
}: IShareholderTableProps) {
  const { getPrettyNum } = useGetPrettyNum();
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
      substantialShareholders.map((itm, key) => ({
        key,
        ...itm,
        serialNum: {
          formSerialUrl: itm.formSerialUrl,
          formSerialNumber: itm.formSerialNumber
        }
      })),
    [substantialShareholders]
  );
  return (
    <div className={classNames.container}>
      <Table
        columns={columns}
        dataSource={keyedData}
        pagination={false}
        loading={isLoading}
        size="small"
      />
    </div>
  );
}

ShareholderTable.propTypes = {};
export default memo(ShareholderTable);
