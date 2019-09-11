import React, { memo } from "react";
/* import PropTypes from "prop-types"; */

import Layout from "../base/Layout/Layout";

interface IHomeContainerProps {}

/* function HomeContainer({  }: IHomeContainerProps) { */
function HomeContainer() {
  return (
    <Layout>
      <div
        style={{
          alignItems: "center",
          color: "white",
          display: "flex",
          flexDirection: "column",
          fontSize: "calc(10px + 2vmin)",
          justifyContent: "center",
          minHeight: "100vh"
        }}
      >
        Hie i am home
      </div>
    </Layout>
  );
}

HomeContainer.propTypes = {};
export default memo(HomeContainer);
