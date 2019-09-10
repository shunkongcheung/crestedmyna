import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import LoginView from "./LoginView";

function AuthContainer({ match }: RouteComponentProps) {
  return (
    <Switch>
      <Route path={`${match.url}/login/`} exact component={LoginView} />
    </Switch>
  );
}
export default AuthContainer;
