import React, { memo, useCallback, useMemo } from "react";
import { Moment } from "moment";
import { Table } from "antd";
import PropTypes from "prop-types";

import TargetDate from "./TargetDate";

import classNames from "./CCASSTrend.module.scss";

interface ICCASSTrendItem {
  participantName: string;
  diffPercent: string;
  firstPercent: string;
  secondPercent: string;
}

interface ICCASSTrendProps {
  ccassTrends: Array<ICCASSTrendItem>;
  handleListChange: (p: number, d?: Moment) => any;
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
  const onChange = useCallback(
    ({ current }) => handleListChange(current || 1),
    [handleListChange]
  );
  const handleTargetDateChange = useCallback(
    (targetDate: Moment) => handleListChange(1, targetDate),
    [handleListChange]
  );

  const columns = useMemo(
    () => [
      {
        dataIndex: "participantName",
        key: "participantName",
        title: "Name"
      },
      {
        title: "% Difference",
        dataIndex: "diffPercent",
        key: "diffPercent"
      },
      {
        title: "Previous %",
        dataIndex: "firstPercent",
        key: "firstPercent"
      },
      {
        title: "Target %",
        dataIndex: "secondPercent",
        key: "secondPercent"
      }
    ],
    []
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
