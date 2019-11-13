import React, { memo } from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";

import { useGetPrettyNum } from "../../hooks";
import StockSector from "./StockSector";

import classNames from "./StockInfo.module.scss";

interface IStockInfoProps {
  handleStockSectorChange: (s: number) => any;
  sector: number;
  sectors: Array<{ name: string; id: number }>;
  stockCode: string;
  shareCount: number;
  marketPrice: number;
  marketValue: number;
  turnover: number;
  realizedValue: number;
  unrealizedValue: number;
}

function StockInfo({
  handleStockSectorChange,
  sector,
  sectors,
  stockCode,
  shareCount,
  marketPrice,
  marketValue,
  turnover,
  realizedValue,
  unrealizedValue
}: IStockInfoProps) {
  const { getPrettyNum } = useGetPrettyNum();
  return (
    <>
      <div className={classNames.row}>
        <div className={classNames.importantTitle}>LATEST PRICE</div>
        <div className={classNames.importantContent}>
          <Tag color="geekblue" style={{ margin: 0 }}>
            {getPrettyNum(marketPrice, {
              toFixedDigit: 3,
              withDollarSign: true
            })}
          </Tag>
        </div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.importantTitle}>TURNOVER</div>
        <div className={classNames.importantContent}>
          <Tag color="geekblue" style={{ margin: 0 }}>
            {`${getPrettyNum(turnover / 1000, {
              toFixedDigit: -1
            })}M`}
          </Tag>
        </div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>STOCK CODE</div>
        <div className={classNames.content}>{stockCode}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>SHARE</div>
        <div className={classNames.content}>{shareCount}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>MARKET VALUE</div>
        <div className={classNames.content}>
          {getPrettyNum(marketValue, { withDollarSign: true })}
        </div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>SECTOR</div>
        <div className={classNames.sectorContent}>
          <StockSector
            handleStockSectorChange={handleStockSectorChange}
            sectors={sectors}
            sector={sector}
          />
        </div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>REALISED GAIN/LOSS</div>
        <div className={classNames.content}>
          {getPrettyNum(realizedValue, { withDollarSign: true })}
        </div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>UNREALISED GAIN/LOSS</div>
        <div className={classNames.content}>
          {getPrettyNum(unrealizedValue, { withDollarSign: true })}
        </div>
      </div>
    </>
  );
}

StockInfo.propTypes = {
  stockCode: PropTypes.string.isRequired,
  shareCount: PropTypes.number.isRequired,
  marketPrice: PropTypes.number.isRequired,
  marketValue: PropTypes.number.isRequired,
  realizedValue: PropTypes.number.isRequired,
  unrealizedValue: PropTypes.number.isRequired
};
export default memo(StockInfo);
