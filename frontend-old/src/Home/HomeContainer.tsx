import React, { memo } from "react";

import Layout from "../Base/Layout";

import HmeNews from "./HmeNews";
import HmeRoute from "./HmeRoute";
import HmeWeather from "./HmeWeather";

import useHomeContainer from "./useHomeContainer";

import classNames from "./HomeContainer.module.scss";

function HomeContainer() {
  const { newsState, weatherState } = useHomeContainer();
  return (
    <Layout>
      <div className={classNames.row}>
        <div className={classNames.weatherCol}>
          <HmeWeather {...weatherState} />
        </div>
        <div className={classNames.newsCol}>
          <HmeNews {...newsState}/>
        </div>
      </div>
      <div className={classNames.routeContainer}>
        <HmeRoute />
      </div>
    </Layout>
  );
}

export default memo(HomeContainer);
