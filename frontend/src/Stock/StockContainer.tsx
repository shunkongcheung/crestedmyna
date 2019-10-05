import React, { memo } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Tabs } from "antd";

import Layout from "../Base/Layout";

import StockTx from "./StockTx";
import StockDetail from "./StockDetail";
import useStockContainer from "./useStockContainer";

const { TabPane } = Tabs;

function StockContainer({ history }: RouteComponentProps) {
  const {
    handleTabChange,
    page,
		stockDetailState,
		stockTxState
  } = useStockContainer(history);
  return (
    <Layout>
      <Tabs activeKey={page} onChange={handleTabChange}>
        <TabPane tab="Stock summary" key="detail">
          <StockDetail {...stockDetailState} />
        </TabPane>
        <TabPane tab="Transactions" key="txes">
          <StockTx {...stockTxState} />
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default memo(withRouter(StockContainer));
