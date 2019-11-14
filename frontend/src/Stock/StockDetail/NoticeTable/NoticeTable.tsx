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

  const renderAveragePrice = useCallback(
    averagePrice => {
      if (averagePrice < 0) return "";
      return getPrettyNum(averagePrice, { withDollarSign: true });
    },
    [getPrettyNum]
  );
  const renderInterestedShare = useCallback(
    interestedShare => {
      if (interestedShare < 0) return "";
      return getPrettyNum(interestedShare, { toFixedDigit: 0 });
    },
    [getPrettyNum]
  );
  const renderIsAssociated = useCallback(isAssociated => {
    return isAssociated ? "Yes" : "No";
  }, []);
  const renderIsDebentures = useCallback(isDebentures => {
    return isDebentures ? "Yes" : "No";
  }, []);

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
        title: "Serial no.",
        dataIndex: "serialNum",
        render: renderSerialNum,
        key: "serialNum"
      },
      {
        title: "Shareholder name",
        dataIndex: "shareholderName",
        key: "shareholderName"
      },
      {
        title: "Reason for disclosure",
        dataIndex: "reasonForDisclosure",
        render: renderedReason,
        key: "reasonForDisclosure"
      },
      {
        title: "Share no.",
        dataIndex: "shareCount",
        render: renderShareCount,
        key: "shareCount"
      },
      {
        title: "Average price",
        dataIndex: "averagePrice",
        render: renderAveragePrice,
        key: "averagePrice"
      },
      {
        title: "No. of shares interested",
        dataIndex: "interestedShare",
        render: renderInterestedShare,
        key: "estedShare"
      },
      {
        title: "% of issued voting shares",
        dataIndex: "sharePercent",
        render: renderSharePercent,
        key: "sharePercent"
      },
      {
        title: "Is share associated corporation",
        dataIndex: "isAssociated",
        render: renderIsAssociated,
        key: "isAssociated"
      },
      {
        title: "Interests in debentures",
        dataIndex: "isDebentures",
        render: renderIsDebentures,
        key: "isDebentures"
      },
      {
        title: "Date",
        dataIndex: "noticeDate",
        render: renderNoticeDate,
        key: "noticeDate"
      }
    ],
    [
      renderAveragePrice,
      renderInterestedShare,
      renderIsAssociated,
      renderIsDebentures,
      renderNoticeDate,
      renderSerialNum,
      renderShareCount,
      renderSharePercent,
      renderedReason
    ]
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
