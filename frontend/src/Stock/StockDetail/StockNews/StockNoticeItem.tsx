import React, { memo, useCallback, useMemo } from "react";
import { Card, Icon, Tooltip } from "antd";
import { Moment } from "moment";
import PropTypes from "prop-types";

import classNames from "./NoticeItem.module.scss";
import getDisclosureDesc from "./getDisclosureDesc";

import { useGetPrettyNum } from "../../hooks";

interface IStockNoticeItemProps {
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

function StockNoticeItem({
  formSerialUrl,
  formSerialNumber,
  shareholderName,
  reasonForDisclosure,
  shareCount,
  averagePrice,
  interestedShare,
  sharePercent,
  noticeDate,
  isAssociated,
  isDebentures
}: IStockNoticeItemProps) {
  const { getPrettyNum } = useGetPrettyNum();
  const renderColumn = useCallback((title, value) => {
    return (
      <div className={classNames.column}>
        <div className={classNames.header}>{title}</div>
        <div className={classNames.value}>{value}</div>
      </div>
    );
  }, []);
  const renderedTitle = useMemo(
    () => (
      <a href={formSerialUrl} rel="noopener noreferrer" target="_blank">
        {formSerialNumber}
      </a>
    ),
    [formSerialNumber, formSerialUrl]
  );

  const renderedReason = useMemo(
    () => {
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
    },
    [reasonForDisclosure]
  );

  const prettyShareCount = useMemo(
    () => (shareCount > 0 ? getPrettyNum(shareCount, { toFixedDigit: 0 }) : ""),
    [getPrettyNum, shareCount]
  );
  const prettySharePercent = useMemo(
    () =>
      sharePercent > 0 ? getPrettyNum(sharePercent, { toFixedDigit: 0 }) : "",
    [getPrettyNum, sharePercent]
  );
  const prettyAveragePrice = useMemo(
    () =>
      averagePrice > 0
        ? getPrettyNum(averagePrice, { withDollarSign: true })
        : "",
    [averagePrice, getPrettyNum]
  );
  const prettyInterestedShare = useMemo(
    () =>
      interestedShare > 0
        ? getPrettyNum(interestedShare, { toFixedDigit: 0 })
        : "",
    [getPrettyNum, interestedShare]
  );

  return (
    <Card className={classNames.card}>
      {renderColumn("SERIAL NO.", renderedTitle)}
      {renderColumn("SHAREHOLDER NAME", shareholderName)}
      {renderColumn("REASON FOR DISCLOSURE", renderedReason)}
      {renderColumn("SHARE NO.", prettyShareCount)}
      {renderColumn("AVERAGE PRICE PER SHARE", prettyAveragePrice)}
      {renderColumn("NO. OF SHARES INTERESTED", prettyInterestedShare)}
      {renderColumn("% OF ISSUED VOTING SHARES", prettySharePercent)}
      {renderColumn(
        "Interests in shares of associated corporation",
        isAssociated ? "Yes" : ""
      )}
      {renderColumn("Interests in debentures", isDebentures ? "Yes" : "")}
      {renderColumn("DATE", noticeDate.format("YYYY/MM/DD"))}
    </Card>
  );
}

StockNoticeItem.propTypes = {
  formSerialUrl: PropTypes.string.isRequired,
  formSerialNumber: PropTypes.string.isRequired,
  shareholderName: PropTypes.string.isRequired,
  reasonForDisclosure: PropTypes.string.isRequired,
  shareCount: PropTypes.number.isRequired,
  averagePrice: PropTypes.number.isRequired,
  interestedShare: PropTypes.number.isRequired,
  sharePercent: PropTypes.number.isRequired,
  noticeDate: PropTypes.object.isRequired,
  isAssociated: PropTypes.bool.isRequired,
  isDebentures: PropTypes.bool.isRequired
};
export default memo(StockNoticeItem);
