import React, { Suspense, lazy } from "react";
import { Spin, notification } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "react-accessories";
import styled, { ThemeProvider } from "styled-components";

const Sudoku = lazy(() => import("./Sudoku"));
const Home = lazy(() => import("./Home"));

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
      <Route path="/sudoku">
        <Sudoku />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/">
        <FourOFour />
      </Route>
    </Switch>
  );
}

const parseResult = (data: { result: any }) => {
  const { result } = data;
  return { result };
};

const parseListResult = (listResult: any, queryParams: any) => {
  const { result } = listResult;
  const { data, count } = result;
  return {
    result: data,
    maxPage: count / 10,
    currentPage: queryParams.page || 1
  };
};

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
    small: "479px"
  }
};

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthContextProvider
          defaultUser={{ username: "" }}
          defaultApiDomain={process.env.REACT_APP_API_DOMAIN}
          defaultParseDetailResult={parseResult}
          defaultParseEditResult={parseResult}
          defaultParseListResult={parseListResult}
          notify={notify}
        >
          <Suspense fallback={<Fallback />}>
            <RouteTable />
          </Suspense>
        </AuthContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
