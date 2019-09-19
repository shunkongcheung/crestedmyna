import React, { memo } from "react";
import { MdAdd } from "react-icons/md";
import { History } from "history";

import useJournalListViewState from "./useJournalListViewState";

import Calendar from "./Calendar";
import Layout from "../..//Base/Layout";

import classes from "./JournalListView.module.scss";

interface IJournalListView {
  history: History;
}
function JournalListView({ history }: IJournalListView) {
  const { handleAdd, ...listState } = useJournalListViewState(history);
  return (
    <Layout>
      <div className={classes.container}>
        <Calendar {...listState} />
        <div className={classes.addContainer}>
          <div className={classes.addBtn} onClick={handleAdd}>
            <MdAdd />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default memo(JournalListView);
