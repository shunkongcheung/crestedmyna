import React, { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { History } from "history";
import PropTypes from "prop-types";

import Layout from "../../Base/Layout";

import Carousel from "./Carousel";
import useJournalDetailViewState from "./useJournalDetailViewState";

import classes from "./JournalDetailView.module.scss";

interface IJournalDetailViewProps {
  history: History;
}

function JournalDetailView({ history }: IJournalDetailViewProps) {
  const { journalMaster } = useJournalDetailViewState();
  const {
    name,
    description,
    endAt,
    id,
    location,
    medias,
    startAt
  } = journalMaster;

  const renderedName = useMemo(
    () => {
      const linkTo = `/journal/edit/${id}/`;
      return (
        <div className={classes.nameContainer}>
          <h1 className={classes.name}> {name.toUpperCase()}</h1>
          <Link className={classes.editLink} to={linkTo}>
            <MdModeEdit />
          </Link>
        </div>
      );
    },
    [id, name]
  );

  const renderDate = useCallback((date: Date, desc: string) => {
    return (
      <div>
        {desc}: {date.toLocaleDateString()}{" "}
        {date.toLocaleTimeString().replace(/(.*)\D\d+/, "$1")}
      </div>
    );
  }, []);

  const iframeArgs = {
    title: "JournalDetail-iframe",
    srcdoc: description,
    className: classes.desc
  };
  return (
    <Layout>
      <div className={classes.titleRow}>
        {renderedName}
        <div className={classes.duration}>
          {renderDate(startAt, "from")}
          {renderDate(endAt, "to")}
        </div>
      </div>
      <h3 className={classes.location}>{location}</h3>
      <Carousel imageItems={medias} />
      <iframe {...iframeArgs} />
    </Layout>
  );
}

JournalDetailView.propTypes = {
  history: PropTypes.object.isRequired
};
export default memo(JournalDetailView);
