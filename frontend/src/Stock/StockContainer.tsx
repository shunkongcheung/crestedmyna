import React, { memo } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Tabs } from "antd";

import Layout from "../Base/Layout";

import Txes from "./Txes";
import StockDetail from "./StockDetail";
import useStockContainer from "./useStockContainer";

const { TabPane } = Tabs;

function StockContainer({ history }: RouteComponentProps) {
  const {
    handleTabChange,
    page,
    txesState,
    stockDetailState
  } = useStockContainer(history);
  return (
    <Layout>
      <Tabs activeKey={page} onChange={handleTabChange}>
        <TabPane tab="Stock summary" key="detail">
          <StockDetail {...stockDetailState} />
        </TabPane>
        <TabPane tab="Transactions" key="txes">
          <Txes {...txesState} />
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default memo(withRouter(StockContainer));
