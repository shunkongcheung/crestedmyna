import React, { memo, useCallback, useMemo } from "react";
import { Moment } from "moment";
import { Table } from "antd";
import PropTypes from "prop-types";

import { useGetPrettyNum } from "../hooks";
import TargetDate from "./TargetDate";

import classNames from "./CCASSTrend.module.scss";

interface ICCASSTrendItem {
  stockName: string;
  diffPercent: string;
  firstPercent: string;
  secondPercent: string;
}
interface IParam {
  targetDate?: Moment;
  orderParams?: { ordering: string; isAscend: boolean };
}

interface ICCASSTrendProps {
  ccassTrends: Array<ICCASSTrendItem>;
  handleListChange: (p: number, i?: IParam) => any;
  isLoading: boolean;
  page: number;
  targetDate: Moment;
  total: number;
}

function CCASSTrend({
  ccassTrends,
  handleListChange,
  page,
  targetDate,
  total
}: ICCASSTrendProps) {
  const { getPrettyNum } = useGetPrettyNum();

  const onChange = useCallback(
    ({ current }, _, extra) => {
      let { order, field } = extra;
      if (order) {
        const orderParams = { ordering: field, isAscend: order === "ascend" };
        handleListChange(1, { orderParams, targetDate });
      } else {
        handleListChange(current || 1, { targetDate });
      }
    },
    [handleListChange, targetDate]
  );
  const handleTargetDateChange = useCallback(
    (targetDate: Moment) => handleListChange(1, { targetDate }),
    [handleListChange]
  );
  const renderPercent = useCallback(val => `${getPrettyNum(val)}%`, [
    getPrettyNum
  ]);

  const columns = useMemo(
    () => [
      {
        dataIndex: "stockName",
        key: "stockName",
        title: "Name"
      },
      {
        title: "% Difference",
        dataIndex: "diffPercent",
        render: renderPercent,
        sorter: true,
        key: "diffPercent"
      },
      {
        title: "Previous %",
        dataIndex: "firstPercent",
        render: renderPercent,
        sorter: true,
        key: "firstPercent"
      },
      {
        title: "Target %",
        dataIndex: "secondPercent",
        render: renderPercent,
        sorter: true,
        key: "secondPercent"
      }
    ],
    [renderPercent]
  );
  const keyedData = useMemo(
    () => ccassTrends.map((itm, key) => ({ ...itm, key })),
    [ccassTrends]
  );
  const pagination = useMemo(() => ({ current: page, total }), [page, total]);
  return (
    <>
      <TargetDate
        handleTargetDateChange={handleTargetDateChange}
        targetDate={targetDate}
      />
      <div className={classNames.container}>
        <Table
          columns={columns}
          dataSource={keyedData}
          onChange={onChange}
          pagination={pagination}
        />
      </div>
    </>
  );
}

CCASSTrend.propTypes = {
  ccassTrends: PropTypes.array.isRequired,
  handleListChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};
export default memo(CCASSTrend);
