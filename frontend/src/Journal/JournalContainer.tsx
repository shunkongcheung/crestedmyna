import React, { memo } from "react";
import { History } from "history";
import PropTypes from "prop-types";

import { Tabs } from "antd";

import JournalDetail from "./JournalDetail";
import JournalEdit from "./JournalEdit";
import JournalCalendar from "./JournalCalendar";
import useJournalContainer from "./useJournalContainer";

import Layout from "../Base/Layout";

const { TabPane } = Tabs;

interface IJournalContainer {
  history: History;
}
function JournalContainer({ history }: IJournalContainer) {
  const {
    contentState,
    calendarState,
    detailState,
    editState
  } = useJournalContainer(history);

  return (
    <Layout>
      <Tabs activeKey={contentState} renderTabBar={() => <></>}>
        <TabPane tab="tab list" key="list">
          <JournalCalendar {...calendarState} />
        </TabPane>
        <TabPane tab="tab detail" key="detail">
          <JournalDetail {...detailState} />
        </TabPane>
        <TabPane tab="tab edit" key="edit">
          <JournalEdit {...editState} />
        </TabPane>
      </Tabs>
    </Layout>
  );
}

JournalContainer.propTypes = {
  history: PropTypes.object.isRequired
};
export default memo(JournalContainer);
