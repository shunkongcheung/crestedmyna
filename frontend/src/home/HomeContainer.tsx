import React, { memo } from "react";

import Layout from "../base/Layout/Layout";

function HomeContainer() {
  return (
    <Layout>
      <div
        style={{
          fontSize: "calc(10px + 2vmin)"
        }}
      >
        Hie i am home
      </div>
    </Layout>
  );
}

export default memo(HomeContainer);
