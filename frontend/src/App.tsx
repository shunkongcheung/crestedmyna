import React, { lazy, Suspense, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

import Layout from "./base/Layout/Layout";
import FourOFour from "./base/Utils/FourOFour";

import classNames from "./App.module.css";

// routes -----------------------------------------------
const AuthContainer = lazy(() => import("./base/Auth/AuthContainer"));
const HomeContainer = lazy(() => import("./home/HomeContainer"));
const JournalContainer = lazy(() => import("./journal/JournalContainer"));

// routes -----------------------------------------------

function RouteTable() {
  return (
    <Switch>
      <Route path="/journal" component={JournalContainer} />
      <Route path="/auth" component={AuthContainer} />
      <Route path="/" exact component={HomeContainer} />
      <Route path="/" component={FourOFour} />
    </Switch>
  );
}

const App: React.FC = () => {
  const renderedFallback = useMemo(() => {
    return (
      <Layout>
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
      </Layout>
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
