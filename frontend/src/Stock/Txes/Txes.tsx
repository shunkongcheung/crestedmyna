import React, { memo, useCallback, useMemo } from "react";
import { Table, Tag } from "antd";

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
interface ITxesProps {
  handleListChange: (p: number, filter: IFilter) => any;
  stockMasters: Array<IStockMaster>;
  page: number;
  total: number;
  txes: Array<ITx>;
  filter?: IFilter;
  isLoading: boolean;
}

function Txes({
  handleListChange,
  stockMasters,
  page,
  txes,
  total
}: ITxesProps) {
  const onChange = useCallback(
    ({ current }, { txType, stockMaster }) =>
      handleListChange(current || 1, { txType, stockMaster } as any),
    [handleListChange]
  );
  const renderStockMaster = useCallback(
    stockMasterId => {
      const stockMaster = stockMasters.find(itm => itm.id === stockMasterId);
      return stockMaster ? stockMaster.name : stockMasterId;
    },
    [stockMasters]
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
    (txAt: Date) => <span>{txAt.toLocaleString()}</span>,
    []
  );
  const keyedData = useMemo(() => txes.map((itm, key) => ({ ...itm, key })), [
    txes
  ]);
  const columns = useMemo(
    () => [
      {
        dataIndex: "stockMaster",
        filters: stockMasters.map(itm => ({
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
    [renderStockMaster, renderTxAt, renderTxType, stockMasters]
  );
  const pagination = useMemo(() => ({ current: page, total }), [page, total]);
  return (
    <>
      <Table
        columns={columns}
        dataSource={keyedData}
        onChange={onChange}
        pagination={pagination}
      />
    </>
  );
}

export default memo(Txes);
