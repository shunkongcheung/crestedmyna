import React, { memo, useCallback, useMemo } from "react";
import { Tag, Table } from "antd";
import PropTypes from "prop-types";

import { useGetPrettyNum } from "../../hooks";

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
  const { getPrettyNum } = useGetPrettyNum();

  const renderValue = useCallback(val => `$${getPrettyNum(val)}`, [
    getPrettyNum
  ]);
  const renderShare = useCallback(val => getPrettyNum(val, false), [
    getPrettyNum
  ]);
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
    (txAt: Date) => <span>{txAt.toLocaleDateString()}</span>,
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
        render: renderValue,
        key: "netValue"
      },
      {
        title: "Share",
        dataIndex: "shareCount",
        render: renderShare,
        key: "shareCount"
      },
      {
        title: "Price",
        dataIndex: "price",
        render: renderValue,
        key: "price"
      },
      {
        title: "Gross value",
        dataIndex: "grossValue",
        render: renderValue,
        key: "grossValue"
      },
      {
        title: "Trade cost",
        dataIndex: "tradeCost",
        render: renderValue,
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
