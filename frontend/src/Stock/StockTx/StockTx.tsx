import React, { memo, useCallback, useMemo } from "react";
import { Table, Tag } from "antd";

import classNames from "./StockTx.module.scss";

type TTxType = "BUY" | "SELL";

interface IFilter {
  txType?: Array<TTxType>;
  stockMaster?: Array<number>;
}
interface IStockMaster {
  name: string;
  id: number;
}
interface ITx {
  grossValue: number;
  netValue: number;
  price: number;
  shareCount: number;
  stockMaster: number;
  tradeCost: number;
  txAt: Date;
  txType: TTxType;
}
interface ISockTxProps {
  handleListChange: (p: number, filter: IFilter) => any;
  stockMasterNames: Array<IStockMaster>;
  stockTxs: Array<ITx>;
  page: number;
  total: number;
  filter?: IFilter;
  isLoading: boolean;
}

function SockTx({
  handleListChange,
  stockMasterNames,
  page,
  stockTxs,
  total
}: ISockTxProps) {
  const onChange = useCallback(
    ({ current }, { txType, stockMaster }) =>
      handleListChange(current || 1, { txType, stockMaster } as any),
    [handleListChange]
  );
  const renderStockMaster = useCallback(
    stockMasterId => {
      const stockMaster = stockMasterNames.find(
        itm => itm.id === stockMasterId
      );
      return stockMaster ? stockMaster.name : stockMasterId;
    },
    [stockMasterNames]
  );
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
        dataIndex: "stockMaster",
        filters: stockMasterNames.map(itm => ({
          text: itm.name,
          value: `${itm.id}`
        })),
        key: "stockMaster",
        render: renderStockMaster,
        title: "Stock"
      },
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
        filters: [
          { text: "BUY", value: "BUY" },
          { text: "SELL", value: "SELL" }
        ],
        render: renderTxType
      },
      {
        title: "At",
        dataIndex: "txAt",
        key: "txAt",
        render: renderTxAt
      }
    ],
    [renderStockMaster, renderTxAt, renderTxType, stockMasterNames]
  );
  const pagination = useMemo(() => ({ current: page, total }), [page, total]);
  return (
    <div className={classNames.container}>
      <Table
        columns={columns}
        dataSource={keyedData}
        onChange={onChange}
        pagination={pagination}
      />
    </div>
  );
}

export default memo(SockTx);
