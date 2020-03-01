import React, { Suspense, lazy } from "react";
import { Spin, notification } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "react-accessories";
import styled, { ThemeProvider } from "styled-components";

const Game = lazy(() => import("./Game"));

const Fallback = styled.div.attrs({
  children: <Spin />
})`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function FourOFour() {
  return <div>404</div>;
}

function RouteTable() {
  return (
    <Switch>
      <Route path="/game">
        <Game />
      </Route>
      <Route path="/">
        <FourOFour />
      </Route>
    </Switch>
  );
}

const notify = (
  msg: string,
  lvl: "success" | "error" | "info" | "none" | "warn"
) => {
  if (lvl !== "none")
    notification[lvl]({
      message: "Something went wrong",
      description: msg
    });
};
const theme = {
  colors: {
    primary: "#e94e80",
    secondary: "#e94e50",
    tertiary: "#373a47",
    quaternary: "#44485c"
  },
  size: {
    medium: "759px",
    small: "47px"
  }
};

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthContextProvider defaultUser={{ username: "" }} notify={notify}>
          <Suspense fallback={<Fallback />}>
            <RouteTable />
          </Suspense>
        </AuthContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
