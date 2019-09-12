import React, { memo } from "react";
import PropTypes from "prop-types";

import Calendar from "../base/Utils/Calendar";

interface IEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}
interface IJournalListViewProps {
  events: Array<IEvent>;
  handleRangeChange: (a: Date, b: Date) => any;
}
function JournalListView({ events, handleRangeChange }: IJournalListViewProps) {
  return (
      <div style={{ height: "70vh" }}>
        <Calendar
          events={events}
          handleEventClick={id => console.log(id)}
          handleRangeChange={handleRangeChange}
        />
      </div>
  );
}

JournalListView.propTypes = {
  events: PropTypes.array.isRequired,
  handleRangeChange: PropTypes.func.isRequired
};

export default memo(JournalListView);
