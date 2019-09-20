import React, { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdModeEdit } from "react-icons/md";
import PropTypes from "prop-types";

import Carousel from "./Carousel";

import classNames from "./JournalDetail.module.scss";

interface IMedia {
  accessUrl: string;
  name: string;
}
interface IJournalDetail {
  handleDetailBack: () => any;
  journalMaster: {
    name: string;
    description: string;
    endAt: Date;
    id: number;
    location: string;
    medias: Array<IMedia>;
    startAt: Date;
  };
}

function JournalDetail({ handleDetailBack, journalMaster }: IJournalDetail) {
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
        <div className={classNames.nameContainer}>
          <div className={classNames.backBtn} onClick={handleDetailBack}>
            <MdKeyboardArrowLeft />
          </div>
          <h1 className={classNames.name}> {name.toUpperCase()}</h1>
          <Link className={classNames.editLink} to={linkTo}>
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

  return (
    <>
      <div className={classNames.titleRow}>
        {renderedName}
        <div className={classNames.duration}>
          {renderDate(startAt, "from")}
          {renderDate(endAt, "to")}
        </div>
      </div>
      <h3 className={classNames.location}>{location}</h3>
      <Carousel imageItems={medias} />
      <iframe
        className={classNames.desc}
        srcDoc={description}
        title="JournalDetail-iframe"
      />
    </>
  );
}

JournalDetail.propTypes = {
  journalMaster: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    endAt: PropTypes.instanceOf(Date).isRequired,
    id: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    medias: PropTypes.array.isRequired,
    startAt: PropTypes.instanceOf(Date).isRequired
  }).isRequired
};

export default memo(JournalDetail);
