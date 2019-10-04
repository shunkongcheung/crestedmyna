import React, { memo, useCallback, useMemo } from "react";
import { Tag, Table } from "antd";
import PropTypes from "prop-types";

type TTxType = "BUY" | "SELL";
interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
}
interface IStockTx {
  txType: TTxType;
  txAt: Date;
  shareCount: number;
  price: number;
  grossValue: number;
  tradeCost: number;
  netValue: number;
}

interface IStockTxTableProps {
  isTxsLoading: boolean;
  stockTxs: Array<IStockTx>;
  page: number;
}

function StockTxTable({ stockTxs, isTxsLoading, page }: IStockTxTableProps) {
  const renderTxType = useCallback((txType: TTxType) => {
    let color = "geekblue";
    if (txType === "SELL") {
      color = "volcano";
    }
    return (
      <Tag color={color} key={txType}>
        {txType}
      </Tag>
    );
  }, []);
  const renderTxAt = useCallback(
    (txAt: Date) => <span>{txAt.toLocaleString()}</span>,
    []
  );
  const keyedData = useMemo(
    () => stockTxs.map((itm, key) => ({ ...itm, key })),
    [stockTxs]
  );

  const columns = useMemo(
    () => [
      {
        title: "Net value",
        dataIndex: "netValue",
        key: "netValue"
      },
      {
        title: "Share",
        dataIndex: "shareCount",
        key: "shareCount"
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price"
      },
      {
        title: "Gross value",
        dataIndex: "grossValue",
        key: "grossValue"
      },
      {
        title: "Trade cost",
        dataIndex: "tradeCost",
        key: "tradeCost"
      },
      {
        title: "Type",
        dataIndex: "txType",
        key: "txType",
        render: renderTxType
      },
      {
        title: "At",
        dataIndex: "txAt",
        key: "txAt",
        render: renderTxAt
      }
    ],
    [renderTxAt, renderTxType]
  );
  return (
    <>
      <Table
        columns={columns}
        dataSource={keyedData}
        loading={isTxsLoading}
        pagination={false}
      />
    </>
  );
}
StockTxTable.propTypes = {
  stockTxs: PropTypes.array.isRequired,
  isTxsLoading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired
};
export default memo(StockTxTable);
