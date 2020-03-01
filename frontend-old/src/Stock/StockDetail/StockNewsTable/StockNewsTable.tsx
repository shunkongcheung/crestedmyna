import React, { memo, useCallback, useMemo } from "react";
import { Spin, Table } from "antd";
import { Moment } from "moment";
import PropTypes from "prop-types";

import StockNewsItem from "./StockNewsItem";

import classNames from "./StockNewsTable.module.scss";

interface IStockNewsItem {
  documentLink: string;
  headline: string;
  releaseTime: Moment;
}

interface IStockNewsProps {
  isLoading: boolean;
  stockNews: Array<IStockNewsItem>;
}

function StockNews({ isLoading, stockNews }: IStockNewsProps) {
  const renderHeadlineAndLink = useCallback(({ headline, documentLink }) => {
    return (
      <a href={documentLink} rel="noopener noreferrer" target="_blank">
        {headline}
      </a>
    );
  }, []);
  const renderReleaseTime = useCallback(val => val.format("YYYY/MM/DD"), []);

  const keyedData = useMemo(
    () =>
      stockNews.map((itm, key) => ({
        key,
        ...itm,
        headlineAndLink: {
          headline: itm.headline,
          documentLink: itm.documentLink
        }
      })),
    [stockNews]
  );

  const columns = useMemo(
    () => [
      {
        key: "headlineAndLink",
        dataIndex: "headlineAndLink",
        render: renderHeadlineAndLink,
        title: "Headline"
      },
      {
        key: "releaseTime",
        dataIndex: "releaseTime",
        render: renderReleaseTime,
        title: "Release Time"
      }
    ],
    [renderHeadlineAndLink, renderReleaseTime]
  );

  return (
    <div className={classNames.container}>
      <Table
        columns={columns}
        dataSource={keyedData}
        loading={isLoading}
        size="small"
      />
    </div>
  );
}

StockNews.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  stockNews: PropTypes.array.isRequired
};
export default memo(StockNews);
