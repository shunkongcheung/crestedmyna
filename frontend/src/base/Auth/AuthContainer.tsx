import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import LoginView from "./LoginView";
import RegisterView from "./RegisterView"
import FourOFour from "../Utils/FourOFour"

function AuthContainer({ match }: RouteComponentProps) {
  return (
    <Switch>
			<Route path={`${match.url}/login/`} exact component={LoginView} />
			<Route path={`${match.url}/register/`} exact component={RegisterView} />
			<Route path="*" component={FourOFour} />
    </Switch>
  );
}
export default AuthContainer;
