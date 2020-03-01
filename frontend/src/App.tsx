import React, { Suspense, lazy, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Spin } from "antd";

// const GameContainer = lazy(() => import("./Game"));

function FourOFour() {
  return <div>404</div>;
}

function RouteTable() {
  return (
    <Switch>
      <Route path="/game" component={() => <div>hihi</div>} />
      <Route path="/" component={FourOFour} />
    </Switch>
  );
}

function App() {
  const renderedFallback = useMemo(
    () => (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Spin />
      </div>
    ),
    []
  );

  return (
    <Router>
      <Suspense fallback={renderedFallback}>
        <RouteTable />
      </Suspense>
    </Router>
  );
}

export default App;
