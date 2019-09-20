import React, { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import PropTypes from "prop-types";

import Carousel from "./Carousel";

import classes from "./JournalDetail.module.scss";

interface IMedia {
  src: string;
  name: string;
}
interface IJournalDetail {
  name: string;
  description: string;
  endAt: Date;
  id: number;
  location: string;
  medias: Array<IMedia>;
  startAt: Date;
}

function JournalDetail({
  name,
  description,
  endAt,
  id,
  location,
  medias,
  startAt
}: IJournalDetail) {
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
    <>
      <div className={classes.titleRow}>
        {renderedName}
        <div className={classes.duration}>
          {renderDate(startAt, "from")}
          {renderDate(endAt, "to")}
        </div>
      </div>
      <h3 className={classes.location}>{location}</h3>
      <Carousel imageItems={medias} />
      <iframe {...iframeArgs} title="journal-detail" />
    </>
  );
}

JournalDetail.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  endAt: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  medias: PropTypes.array.isRequired,
  startAt: PropTypes.instanceOf(Date).isRequired
};

export default memo(JournalDetail);
