import React, { lazy, Suspense, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

import Layout from "./Base/Layout/Layout";
import { FourOFour } from "./Base/Utils";
import GlobalContexts from "./Base/Contexts/GlobalContexts";

import classNames from "./App.module.css";

// routes -----------------------------------------------
const AuthContainer = lazy(() => import("./Base/Auth/AuthContainer"));
const HomeContainer = lazy(() => import("./Home/HomeContainer"));
const JournalContainer = lazy(() => import("./Journal/JournalContainer"));
const StockContainer = lazy(() => import("./Stock/StockContainer"));

// routes -----------------------------------------------

function RouteTable() {
  return (
    <Switch>
      <Route path="/journal" component={JournalContainer} />
      <Route path="/stock" component={StockContainer} />
      <Route path="/uam" component={AuthContainer} />
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
        <GlobalContexts>
          <Suspense fallback={renderedFallback}>
            <RouteTable />
          </Suspense>
        </GlobalContexts>
      </Router>
    </div>
  );
};

export default App;
