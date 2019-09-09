import React, { lazy, Suspense, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

import FourOFour from "./base/Utils/FourOFour";

import classNames from "./App.module.css";

// routes -----------------------------------------------
const HomeContainer = lazy(() => import("./home/HomeContainer"));

// routes -----------------------------------------------

function RouteTable() {
  return (
    <Switch>
      <Route path="/" exact component={HomeContainer} />
      <Route path="/" component={FourOFour} />
    </Switch>
  );
}

const App: React.FC = () => {
  const renderedFallback = useMemo(() => {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ScaleLoader color="#e94e80" loading />
      </div>
    );
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
