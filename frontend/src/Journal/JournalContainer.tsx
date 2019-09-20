import React, { memo } from "react";
import { RouteComponentProps, Switch, Route } from "react-router-dom";

import JournalDetailView from "./JournalDetailView";
import JournalEditView from "./JournalEditView";
import JournalListView from "./JournalListView";

import { FourOFour } from "../Base/Utils";

function JournalContainer({ match: { url } }: RouteComponentProps) {
  return (
    <Switch>
      <Route path={`${url}/create/`} exact component={JournalEditView} />
      <Route path={`${url}/edit/:id/`} exact component={JournalEditView} />
      <Route path={`${url}/:id/`} exact component={JournalDetailView} />
      <Route path={`${url}/`} exact component={JournalListView} />
      <Route path="*" component={FourOFour} />
    </Switch>
  );
}

export default memo(JournalContainer);