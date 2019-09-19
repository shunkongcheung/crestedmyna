import React, { memo } from "react";

import Layout from "../Base/Layout";
import HmeRoute from "./HmeRoute";
import HmeWeather from "./HmeWeather";

import useHomeContainer from "./useHomeContainer"

function HomeContainer() {
	const {weatherState} = useHomeContainer()
  return (
    <Layout>
      <HmeWeather {...weatherState}/>
      <HmeRoute />
    </Layout>
  );
}

export default memo(HomeContainer);
