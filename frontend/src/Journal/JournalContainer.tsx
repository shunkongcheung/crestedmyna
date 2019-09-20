import React, { memo } from "react";

import JournalDetail from "./JournalDetail";
import JournalEdit from "./JournalEdit";
import JournalCalendar from "./JournalCalendar";

import useJournalContainer from "./useJournalContainer";

import Layout from "../Base/Layout";

interface IPageScrollerRef {
  goToPage: (p: number) => any;
}
function JournalContainer() {
  const {
    contentState,
    calendarState,
    journalMaster,
    editState
  } = useJournalContainer();

  return (
    <Layout>
      <JournalCalendar {...calendarState} />
      <JournalDetail {...journalMaster} />
      <JournalEdit {...editState} />
    </Layout>
  );
}

export default memo(JournalContainer);
