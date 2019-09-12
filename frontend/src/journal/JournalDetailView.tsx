import React, { memo, useCallback } from "react";
import { History } from "history";
import PropTypes from "prop-types";

import Layout from "../base/Layout/Layout";
import Carousel from "../base/Utils/Carousel";
import useJournalDetailViewState from "./useJournalDetailViewState";

import classes from "./JournalDetailView.module.scss";

interface IJournalDetailViewProps {
  history: History;
}

function JournalDetailView({ history }: IJournalDetailViewProps) {
  const { journalMaster } = useJournalDetailViewState();
  const { name, medias, description, startAt, endAt } = journalMaster;

  const renderDate = useCallback((date: Date, desc: string) => {
    return (
      <div>
        {desc}: {date.toLocaleDateString()}{" "}
        {date.toLocaleTimeString().replace(/(.*)\D\d+/, "$1")}
      </div>
    );
  }, []);
  return (
    <Layout>
      <div className={classes.titleRow}>
        <h1 className={classes.name}>{name.toUpperCase()}</h1>
        <div className={classes.duration}>
          {renderDate(startAt, "from")}
          {renderDate(endAt, "to")}
        </div>
      </div>
      <Carousel imageItems={medias} />
      <div dangerouslySetInnerHTML={{ __html: description }} className={classes.desc}/>
    </Layout>
  );
}

JournalDetailView.propTypes = {
  history: PropTypes.object.isRequired
};
export default memo(JournalDetailView);
