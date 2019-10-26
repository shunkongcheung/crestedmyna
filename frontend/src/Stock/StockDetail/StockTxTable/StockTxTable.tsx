import React, { memo, useCallback, useMemo } from "react";
import { Icon, Popconfirm, Tag, Table } from "antd";
import PropTypes from "prop-types";

import { useGetPrettyNum } from "../../hooks";

type TTxType = "BUY" | "SELL" | "DIVIDEND";
interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
}
interface IStockTx {
  id: number;
  txType: TTxType;
  txAt: Date;
  shareCount: number;
  price: number;
  grossValue: number;
  tradeCost: number;
  netValue: number;
}

interface IStockTxTableProps {
  handleDeleteTx: (i: number) => any;
  handleListChange: (p: number) => any;
  isLoading: boolean;
  stockTxs: Array<IStockTx>;
  page: number;
  total: number;
}

function StockTxTable({
  handleDeleteTx,
  handleListChange,
  isLoading,
  page,
  stockTxs,
  total
}: IStockTxTableProps) {
  const { getPrettyNum } = useGetPrettyNum();

  const onChange = useCallback(({ current }) => handleListChange(current), [
    handleListChange
  ]);
  const renderCtrl = useCallback(
    txId => {
      return (
        <Popconfirm
          title="Are you sure delete this transaction?"
          onConfirm={() => handleDeleteTx(txId)}
          okText="Delete"
          cancelText="Cancel"
        >
          <Icon type="delete" />
        </Popconfirm>
      );
    },
    [handleDeleteTx]
  );
  const renderValue = useCallback(val => `$${getPrettyNum(val)}`, [
    getPrettyNum
  ]);
  const renderShare = useCallback(val => getPrettyNum(val, false), [
    getPrettyNum
  ]);
  const renderTxType = useCallback((txType: TTxType) => {
    let color = "geekblue";
    if (txType === "SELL") color = "volcano";
    if (txType === "DIVIDEND") color = "green";
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
        title: "Price",
        dataIndex: "price",
        render: renderValue,
        key: "price"
      },
      {
        title: "Share",
        dataIndex: "shareCount",
        render: renderShare,
        key: "shareCount"
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
      },
      {
        dataIndex: "id",
        key: "id",
        render: renderCtrl
      }
    ],
    [renderCtrl, renderTxAt, renderTxType, renderShare, renderValue]
  );
  const pagination = useMemo(() => ({ current: page, total }), [page, total]);
  return (
    <>
      <Table
        columns={columns}
        dataSource={keyedData}
        loading={isLoading}
        onChange={onChange}
        pagination={pagination}
        size="small"
      />
    </>
  );
}
StockTxTable.propTypes = {
  handleListChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  stockTxs: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired
};
export default memo(StockTxTable);
