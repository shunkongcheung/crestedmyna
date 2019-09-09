import React, { memo } from "react";
import { RouteComponentProps, Route, Switch } from "react-router-dom";

import JournalListView from "./JournalListView";
import FourOFour from "../base/Utils/FourOFour";

function JournalContainer({ match }: RouteComponentProps) {
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={JournalListView} />
      <Route path="/" component={FourOFour} />
    </Switch>
  );
}

export default memo(JournalContainer);
