import React, { memo, ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import PropTypes from "prop-types";

import useAuthContextState from "./useAuthContextState";
import AuthContext from "./AuthContext";

import MenuContext from "./MenuContext";

interface IGlobalContextsProps {
  children: ReactNode;
}

function GlobalContexts({
  children,
  history
}: IGlobalContextsProps & RouteComponentProps) {
  const tokenState = useAuthContextState();
  return (
    <AuthContext.Provider value={tokenState}>
      <MenuContext.Provider value={{ menu: ["JOURNAL", "GAME", "STOCK"] }}>
        {children}
      </MenuContext.Provider>
    </AuthContext.Provider>
  );
}

GlobalContexts.propTypes = {
  children: PropTypes.element.isRequired
};
export default memo(withRouter(GlobalContexts));
