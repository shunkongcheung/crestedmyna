import React, { memo, useCallback, useMemo } from "react";
import { Icon, Tag, Table } from "antd";
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
  unrealizedValue: number;
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
      let { order, field } = extra;
      if (field === "nameAndCode") field = "name";
      if (order) {
        const orderParams = { ordering: field, isAscend: order === "ascend" };
        return handleListChange(1, orderParams);
      } else return handleListChange(page);
    },
    [handleListChange]
  );

  const renderValue = useCallback(
    x => `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    []
  );

  const renderTag = useCallback((value: number) => {
    const color = value >= 0 ? "green" : "#e94e80";
    const padding = "0.5rem";
    const iconType = `caret-${value >= 0 ? "up" : "down"}`;
    return (
      <span style={{ color, padding }}>
        <Icon type={iconType} />
      </span>
    );
  }, []);

  const renderGainLoss = useCallback(
    (value: number) => {
      const fixedValue = renderValue(value.toFixed(2));
      const renderedTag = renderTag(value);
      return (
        <>
          {renderedTag}
          {fixedValue}
        </>
      );
    },
    [renderTag, renderValue]
  );

  const renderNameAndCode = useCallback(
    ({ name, stockCode, realizedValue, unrealizedValue }) => {
      const totalValue = realizedValue + unrealizedValue;
      const renderedTag = renderTag(totalValue);
      return (
        <div className={classNames.nameAndCodeContainer}>
          <div className={classNames.nameTagContainer}>{renderedTag}</div>
          <div>
            <div className={classNames.nameContainer}>{name}</div>
            <div className={classNames.stockCodeContainer}>{stockCode}</div>
          </div>
        </div>
      );
    },
    [renderTag]
  );

  const columns = useMemo(
    () => [
      {
        dataIndex: "nameAndCode",
        key: "nameAndCode",
        render: renderNameAndCode,
        sorter: true,
        title: "Name"
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
        render: renderValue,
        sorter: true,
        title: "Market value"
      },
      {
        dataIndex: "realizedValue",
        key: "realizedValue",
        render: renderGainLoss,
        sorter: true,
        title: "Realized gain/loss"
      },

      {
        dataIndex: "unrealizedValue",
        key: "unrealizedValue",
        render: renderGainLoss,
        sorter: true,
        title: "Unealized gain/loss"
      }
    ],
    [renderGainLoss, renderNameAndCode]
  );
  const keyedData = useMemo(
    () =>
      stockMasters.map((itm, key) => ({
        ...itm,
        nameAndCode: {
          name: itm.name,
          stockCode: itm.stockCode,
          realizedValue: itm.realizedValue,
          unrealizedValue: itm.unrealizedValue
        },
        key
      })),
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
        dataSource={keyedData}
        footer={renderedFooter}
        loading={isLoading}
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
