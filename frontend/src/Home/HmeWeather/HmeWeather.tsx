import React, { memo } from "react";
import PropTypes from "prop-types";

import classNames from "./HmeWeather.module.scss";

interface IHmeWeatherProps {
  dataTime: Date;
  descDetail: string;
  descMain: string;
  humidity: number;
  iconUrl: string;
  location: string;
  temp: number;
  tempMax: number;
  tempMin: number;
}

function HmeWeather({
  dataTime,
  descDetail,
  descMain,
  humidity,
  iconUrl,
  location,
  temp,
  tempMax,
  tempMin
}: IHmeWeatherProps) {
  return (
    <div className={classNames.container}>
      <div className={classNames.skyImg} />
      <div className={classNames.content}>
        <div className={classNames.timeAndTempRow}>
          <span className={classNames.tempTxt}>{temp}</span>
          <span className={classNames.tempUnit}>&deg;C</span>
          <div className={classNames.iconContainer}>
            <img alt="" className={classNames.iconImg} src={iconUrl} />
            <span className={classNames.descMainTxt}>
              {descMain.toUpperCase()}
            </span>
          </div>
        </div>
        <div className={classNames.descDetailRow}>{descDetail}</div>
        <div className={classNames.detailRow}>
          <div className={classNames.location}>{location.toUpperCase()}</div>
          <div className={classNames.detailItem}>
            <span className={classNames.detailTitle}>MAX TEMP.</span>
            <span className={classNames.detailValue}>
              {tempMax}
              &deg;C
            </span>
          </div>
          <div className={classNames.detailItem}>
            <span className={classNames.detailTitle}>MIN TEMP.</span>
            <span className={classNames.detailValue}>
              {tempMin}
              &deg;C
            </span>
          </div>
          <div className={classNames.detailItem}>
            <span className={classNames.detailTitle}>HUMIDITY</span>
            <span className={classNames.detailValue}>{humidity}%</span>
          </div>
          <div className={classNames.dataTimeRow}>
            <span className={classNames.dataTimeTxt}>
              {dataTime.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

HmeWeather.propTypes = {
  dataTime: PropTypes.instanceOf(Date).isRequired,
  descDetail: PropTypes.string.isRequired,
  descMain: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  iconUrl: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
  tempMin: PropTypes.number.isRequired
};
export default memo(HmeWeather);
