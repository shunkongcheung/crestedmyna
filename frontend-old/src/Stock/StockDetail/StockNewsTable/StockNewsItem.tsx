import React, { memo } from "react";
import { Moment } from "moment";
import PropTypes from "prop-types";

import classNames from "./StockNewsItem.module.scss";

interface IStockNewsItemProps {
  documentLink: string;
  headline: string;
  releaseTime: Moment;
}

function StockNewsItem({
  documentLink,
  headline,
  releaseTime
}: IStockNewsItemProps) {
  return (
    <div className={classNames.container}>
      <div className={classNames.titleContainer}>
        <a
          className={classNames.docLink}
          href={documentLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          {headline}
        </a>
      </div>
      <div className={classNames.dateContainer}>
        {releaseTime.format("YYYY-MM-DD HH:mm")}
      </div>
    </div>
  );
}

StockNewsItem.propTypes = {
  documentLink: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  releaseTime: PropTypes.object.isRequired
};
export default memo(StockNewsItem);
