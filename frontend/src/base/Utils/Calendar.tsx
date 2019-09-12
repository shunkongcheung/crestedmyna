import React, { memo, useCallback } from "react";
import { Calendar as BCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import PropTypes from "prop-types";

import "react-big-calendar/lib/sass/styles.scss";
import "./Calendar.scss";

const localizer = momentLocalizer(moment);

interface IEvent {
  id: number;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
}

interface ICalendarProps {
  date?: Date;
  events: Array<IEvent>;
  handleEventClick: (id: number) => any;
  handleRangeChange: (startAt: Date, endAt: Date) => any;
}

function Calendar({
  date = new Date(),
  events,
  handleEventClick,
  handleRangeChange
}: ICalendarProps) {
  const getStartEndFromArr = useCallback(rangeArr => {
    const startAt = rangeArr[0];
    const endAt = rangeArr[rangeArr.length - 1];
    return { startAt, endAt };
  }, []);
  const getStartEndFromObj = useCallback(rangeObj => {
    return { startAt: rangeObj.start, endAt: rangeObj.end };
  }, []);
  const onRangeChange = useCallback(
    range => {
      const { startAt, endAt } = Array.isArray(range)
        ? getStartEndFromArr(range)
        : getStartEndFromObj(range);
      handleRangeChange(startAt, endAt);
    },
    [getStartEndFromArr, getStartEndFromObj, handleRangeChange]
  );
  const onDoubleClickEvent = useCallback(
    event => {
      handleEventClick(event.id);
    },
    [handleEventClick]
  );
  return (
    <BCalendar
      date={date}
      events={events}
      localizer={localizer}
      onRangeChange={onRangeChange}
      onDoubleClickEvent={onDoubleClickEvent}
    />
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  events: PropTypes.array.isRequired,
  handleEventClick: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired
};
export default memo(Calendar);
