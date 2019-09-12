import React, { memo } from "react";
import { History } from "history";

import useJournalListViewState from "./useJournalListViewState";

import Calendar from "../base/Utils/Calendar";
import Layout from "../base/Layout/Layout";

interface IJournalListView {
  history: History;
}
function JournalListView({ history }: IJournalListView) {
  const listState = useJournalListViewState(history);
  return (
    <Layout>
      <div style={{ height: "70vh" }}>
        <Calendar {...listState}  />
      </div>
    </Layout>
  );
}

export default memo(JournalListView);
