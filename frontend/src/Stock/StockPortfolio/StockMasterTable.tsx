import React, { memo, useCallback, useMemo } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";

import classNames from "./StockMasterTable.module.scss";

type TOrderBy =
  | "marketValue"
  | "name"
  | "realizedValue"
  | "stockCode"
  | "shareCount";
interface IOrderParams {
  ordering: TOrderBy;
  isAscend: boolean;
}
interface IStockMaster {
  stockCode: string;
  name: string;
  shareCount: number;
  marketPrice: number;
  marketValue: number;
  realizedValue: number;
}
interface IStockMasterTableProps {
  handleListChange: (p: number, o?: IOrderParams) => any;
  isLoading: boolean;
  page: number;
  stockMasters: Array<IStockMaster>;
  total: number;
}

function StockMasterTable({
  handleListChange,
  isLoading,
  page,
  stockMasters,
  total
}: IStockMasterTableProps) {
  const onChange = useCallback(
    ({ page }, _, extra) => {
      const { order, field } = extra;
      if (order) {
        const orderParams = { ordering: field, isAscend: order === "ascend" };
        return handleListChange(1, orderParams);
      } else return handleListChange(page);
    },
    [handleListChange]
  );

  const columns = useMemo(
    () => [
      {
        dataIndex: "name",
        key: "name",
        sorter: true,
        title: "Name"
      },
      {
        dataIndex: "stockCode",
        key: "stockCode",
        sorter: true,
        title: "Code"
      },
      {
        dataIndex: "shareCount",
        key: "shareCount",
        sorter: true,
        title: "Share"
      },
      {
        dataIndex: "marketPrice",
        key: "marketPrice",
        sorter: true,
        title: "Market Price"
      },
      {
        dataIndex: "marketValue",
        key: "marketValue",
        sorter: true,
        title: "Market value"
      },
      {
        dataIndex: "realizedValue",
        key: "realizedValue",
        sorter: true,
        title: "Realized value"
      }
    ],
    []
  );
  const keyedData = useMemo(
    () => stockMasters.map((itm, key) => ({ ...itm, key })),
    [stockMasters]
  );
  const pagination = useMemo(() => ({ current: page, total }), [page, total]);

  const renderedFooter = useCallback(() => {
    return (
      <div className={classNames.footer}>
        <span className={classNames.star}>*</span>
				<span>Please refresh if you edited on summary tab.</span>
      </div>
    );
  }, []);

  return (
    <>
      <Table
        columns={columns}
        footer={renderedFooter}
        dataSource={keyedData}
        onChange={onChange}
        pagination={pagination}
      />
    </>
  );
}

StockMasterTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  stockMasters: PropTypes.arrayOf(
    PropTypes.shape({
      stockCode: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      shareCount: PropTypes.number.isRequired,
      marketPrice: PropTypes.number.isRequired,
      marketValue: PropTypes.number.isRequired,
      realizedValue: PropTypes.number.isRequired
    })
  ).isRequired,
  total: PropTypes.number.isRequired
};
export default memo(StockMasterTable);
