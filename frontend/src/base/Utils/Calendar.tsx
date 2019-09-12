import React, { memo, useCallback } from "react";
import { Calendar as BCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import PropTypes from "prop-types";

import "react-big-calendar/lib/sass/styles.scss";
import "./Calendar.scss";

const localizer = momentLocalizer(moment);

interface IEvent {
  id: number;
  name: string;
  start_at: Date;
  end_at: Date;
}

interface ICalendarProps {
  events: Array<IEvent>;
  handleEventClick: (id: number) => any;
  handleRangeChange: (startAt: Date, endAt: Date) => any;
}

function Calendar({
  events,
  handleEventClick,
  handleRangeChange
}: ICalendarProps) {
  const onRangeChange = useCallback(
    range => {
      const startAt = range[0];
      const endAt = range[range.length - 1];
      handleRangeChange(startAt, endAt);
    },
    [handleRangeChange]
  );
  const onDoubleClickEvent = useCallback(
    event => {
      handleEventClick(event.id);
    },
    [handleEventClick]
  );
  return (
    <BCalendar
      localizer={localizer}
      events={events}
      onRangeChange={onRangeChange}
      onDoubleClickEvent={onDoubleClickEvent}
      startAccessor="start_at"
      endAccessor="end_at"
      titleAccessor="name"
    />
  );
}

Calendar.propTypes = {
  events: PropTypes.array.isRequired,
  handleEventClick: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired
};
export default memo(Calendar);
