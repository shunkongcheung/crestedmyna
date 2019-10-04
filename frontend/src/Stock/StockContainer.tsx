import React, { memo } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Tabs } from "antd";

import Layout from "../Base/Layout";
import StockDetail from "./StockDetail";
import useStockContainer from "./useStockContainer";

const { TabPane } = Tabs;

function StockContainer({ history }: RouteComponentProps) {
  const {handleTabChange, page,  stockDetailState } = useStockContainer(
    history
  );
  return (
    <Layout>
      <Tabs activeKey={page} onChange={handleTabChange}>
        <TabPane tab="Stock summary" key="detail">
          <StockDetail {...stockDetailState} />
        </TabPane>
        <TabPane tab="Portfolio" key="portfolio">
          <StockDetail {...stockDetailState} />
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default memo(withRouter(StockContainer));
