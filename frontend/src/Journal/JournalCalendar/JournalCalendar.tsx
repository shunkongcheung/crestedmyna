import React, { memo, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import PropTypes from "prop-types";

import Calendar from "./Calendar";

import classes from "./JournalCalendar.module.scss";

interface IEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}
interface IJournalCalendar {
  events: Array<IEvent>;
  handleRangeChange: (gte?: Date, lte?: Date) => any;
  handleCalendarClick: (id?: number) => any;
}
function JournalCalendar({
  events,
  handleCalendarClick,
  handleRangeChange
}: IJournalCalendar) {
  const handleAdd = useCallback(() => handleCalendarClick(), [
    handleCalendarClick
  ]);
  return (
    <div className={classes.container}>
      <Calendar
        events={events}
        handleEventClick={handleCalendarClick}
        handleRangeChange={handleRangeChange}
      />
      <div className={classes.addContainer}>
        <div className={classes.addBtn} onClick={handleAdd}>
          <MdAdd />
        </div>
      </div>
    </div>
  );
}

JournalCalendar.propTypes = {
  events: PropTypes.array.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  handleCalendarClick: PropTypes.func.isRequired
};

export default memo(JournalCalendar);
