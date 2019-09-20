import React, { memo } from "react";
import { History } from "history";
import PropTypes from "prop-types";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

import JournalDetail from "./JournalDetail";
import JournalEdit from "./JournalEdit";
import JournalCalendar from "./JournalCalendar";
import useJournalContainer from "./useJournalContainer";

import Layout from "../Base/Layout";

import "rc-tabs/assets/index.css";

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
      <Tabs
        activeKey={contentState}
        renderTabBar={() => <></>}
        renderTabContent={() => <TabContent />}
      >
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
