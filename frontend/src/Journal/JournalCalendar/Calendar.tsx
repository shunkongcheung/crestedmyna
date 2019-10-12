import React, { memo, useCallback } from "react";
import { Calendar as ACalendar, Badge } from "antd";
import moment, { Moment } from "moment";
import PropTypes from "prop-types";

import classNames from "./Calendar.module.scss";

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
  handleRangeChange: (startAt: Moment, endAt: Moment) => any;
}

function Calendar({
  date = new Date(),
  events,
  handleEventClick,
  handleRangeChange
}: ICalendarProps) {
  const dateCellRender = useCallback(
    (value: Moment) => {
      const cellDate = value.date();
      const eventOnDate = events.filter(itm => {
        const mmStart = moment(itm.start);
        const mmEnd = moment(itm.end);
        return mmStart.date() <= cellDate && mmEnd.date() >= cellDate;
      });
      return (
        <ul className={classNames.events}>
          {eventOnDate.map(item => (
            <li key={item.id} onClick={() => handleEventClick(item.id)}>
              <Badge
                className={classNames.event}
                status="success"
                text={item.title}
              />
            </li>
          ))}
        </ul>
      );
    },
    [events, handleEventClick]
  );

  const handlePanelChange = useCallback(
    (date: Moment | undefined, mode: "month" | "year" | undefined) => {
      if (!mode || !date) return;
      const startAt = moment(date).startOf(mode);
      const endAt = moment(date).endOf(mode);
      return handleRangeChange(startAt, endAt);
    },
    [handleRangeChange]
  );

  return (
    <ACalendar
      dateCellRender={dateCellRender}
      onPanelChange={handlePanelChange}
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
