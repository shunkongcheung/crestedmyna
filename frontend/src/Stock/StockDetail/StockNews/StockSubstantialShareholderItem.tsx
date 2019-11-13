import React, { memo, useCallback, useMemo } from "react";
import { Card } from "antd";
import { Moment } from "moment";
import PropTypes from "prop-types";

import classNames from "./NoticeItem.module.scss";

import { useGetPrettyNum } from "../../hooks";

interface IStockSubstantialShareholderItemProps {
  formSerialUrl: string;
  formSerialNumber: string;
  shareholderName: string;
  shareCount: number;
  sharePercent: number;
  noticeDate: Moment;
}

function StockSubstantialShareholderItem({
  formSerialUrl,
  formSerialNumber,
  shareholderName,
  shareCount,
  sharePercent,
  noticeDate
}: IStockSubstantialShareholderItemProps) {
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

  const prettyShareCount = useMemo(
    () => (shareCount > 0 ? getPrettyNum(shareCount, { toFixedDigit: 0 }) : ""),
    [getPrettyNum, shareCount]
  );
  const prettySharePercent = useMemo(
    () =>
      sharePercent > 0 ? getPrettyNum(sharePercent, { toFixedDigit: 0 }) : "",
    [getPrettyNum, sharePercent]
  );

  return (
    <Card className={classNames.card}>
      {renderColumn("SERIAL NO.", renderedTitle)}
      {renderColumn("SHAREHOLDER NAME", shareholderName)}
      {renderColumn("SHARE NO.", prettyShareCount)}
      {renderColumn("% OF ISSUED VOTING SHARES", prettySharePercent)}
      {renderColumn("DATE", noticeDate.format("YYYY/MM/DD"))}
    </Card>
  );
}

StockSubstantialShareholderItem.propTypes = {};
export default memo(StockSubstantialShareholderItem);
