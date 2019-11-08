import React, { memo, useCallback, useMemo } from "react";
import { Table, Tag } from "antd";
import { Moment } from "moment";
import PropTypes from "prop-types";

import { useGetPrettyNum } from "../hooks";
import TargetDate from "./TargetDate";

import classNames from "./CCASSTrend.module.scss";

interface ICCASSTrendItem {
  stockName: string;
  diffPercent: number;
  firstPercent: number;
  secondPercent: number;
  diffShare: number;
  firstShare: number;
  secondShare: number;
  diffTurnover: number;
  firstTurnover: number;
  secondTurnover: number;
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
  isLoading,
  page,
  targetDate,
  total
}: ICCASSTrendProps) {
  const { getPrettyNum } = useGetPrettyNum();

  const onChange = useCallback(
    ({ current }, _, extra) => {
      let { order, field } = extra;
      if (field === "stockName") field = "stockCode";
      if (order) {
        const orderParams = { ordering: field, isAscend: order === "ascend" };
        handleListChange(current || 1, { orderParams, targetDate });
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

  const renderTxtValue = useCallback((txtValue, val, isTag) => {
    if (!isTag) return txtValue;
    let color = "geekblue";
    if (val < 0) color = "red";
    if (val > 0) color = "green";
    return <Tag color={color}>{txtValue}</Tag>;
  }, []);

  const renderShare = useCallback(
    (val, isTag = false) => {
      const isGreaterThanThousand = val > 1000;
      const prettyNum = getPrettyNum(isGreaterThanThousand ? val / 1000 : val);
      const unit = isGreaterThanThousand ? "M" : "k";
      const txtValue = `${prettyNum}${unit}`;
      return renderTxtValue(txtValue, val, isTag);
    },
    [getPrettyNum, renderTxtValue]
  );
  const renderPercent = useCallback(
    (val, isTag = false) => {
      const txtValue = getPrettyNum(val, { withPercentSign: true });
      return renderTxtValue(txtValue, val, isTag);
    },
    [getPrettyNum, renderTxtValue]
  );

  const columns = useMemo(
    () => [
      {
        dataIndex: "stockName",
        key: "stockName",
        sorter: true,
        title: "Name"
      },
      {
        title: "% Difference",
        dataIndex: "diffPercent",
        render: (val: number) => renderPercent(val, true),
        sorter: true,
        key: "diffPercent"
      },
      {
        title: "Previous %",
        dataIndex: "firstPercent",
        render: (val: number) => renderPercent(val),
        sorter: true,
        key: "firstPercent"
      },
      {
        title: "Target %",
        dataIndex: "secondPercent",
        render: (val: number) => renderPercent(val),
        sorter: true,
        key: "secondPercent"
      },
      {
        title: "share difference",
        dataIndex: "diffShare",
        render: (val: number) => renderShare(val, true),
        sorter: true,
        key: "diffShare"
      },
      {
        title: "Previous share",
        dataIndex: "firstShare",
        render: (val: number) => renderShare(val),
        sorter: true,
        key: "firstShare"
      },
      {
        title: "Target share",
        dataIndex: "secondShare",
        render: (val: number) => renderShare(val),
        sorter: true,
        key: "secondShare"
      }
    ],
    [renderShare, renderPercent]
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
          loading={isLoading}
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
