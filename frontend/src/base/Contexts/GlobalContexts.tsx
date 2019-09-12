import React, { memo, ReactNode } from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";
import PropTypes from "prop-types";

import useAuthContextState from "./useAuthContextState";
import AuthContext from "./AuthContext";

import useSnackBarContextState from "./useSnackBarContextState";
import SnackBarContext from "./SnackBarContext";
import SnackBar from "./SnackBar";

import MenuContext from "./MenuContext";

interface IGlobalContextsProps {
  children: ReactNode;
  history: History;
}

function GlobalContexts({ children, history }: IGlobalContextsProps) {
  const tokenState = useAuthContextState();
  const { msgInfo, handleSnackBarChange } = useSnackBarContextState(history);
  return (
    <AuthContext.Provider value={tokenState}>
      <SnackBarContext.Provider value={{ handleSnackBarChange }}>
        <MenuContext.Provider value={{ menu: ["JOURNAL", "STOCK"] }}>
          {children}
          <SnackBar {...msgInfo} />
        </MenuContext.Provider>
      </SnackBarContext.Provider>
    </AuthContext.Provider>
  );
}

GlobalContexts.propTypes = {
  children: PropTypes.element.isRequired
};
export default memo(withRouter(GlobalContexts));
