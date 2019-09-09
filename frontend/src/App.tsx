import React, { lazy, Suspense, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import classNames from "./App.module.css";

// routes -----------------------------------------------
const HomeContainer = lazy(() => import("./home/HomeContainer"));

// routes -----------------------------------------------

function RouteTable() {
  return (
    <Switch>
      <Route path="/" component={HomeContainer} />
    </Switch>
  );
}

const App: React.FC = () => {
  const renderedFallback = useMemo(() => {
    return <span>hihi</span>;
  }, []);
  return (
    <div className={classNames.app}>
      <Router>
        <Suspense fallback={renderedFallback}>
          <RouteTable />
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
