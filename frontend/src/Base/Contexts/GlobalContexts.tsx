import React, { memo, ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import PropTypes from "prop-types";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import useAuthContextState from "./useAuthContextState";
import AuthContext from "./AuthContext";

import useSnackBarContextState from "./useSnackBarContextState";
import SnackBarContext from "./SnackBarContext";
import SnackBar from "./SnackBar";

import MenuContext from "./MenuContext";

interface IGlobalContextsProps {
  children: ReactNode;
}

function GlobalContexts({
  children,
  history
}: IGlobalContextsProps & RouteComponentProps) {
  const tokenState = useAuthContextState();
  const { msgInfo, handleSnackBarChange } = useSnackBarContextState(history);
  return (
    <AuthContext.Provider value={tokenState}>
      <SnackBarContext.Provider value={{ handleSnackBarChange }}>
        <MenuContext.Provider value={{ menu: ["JOURNAL", "GAME", "STOCK"] }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {children}
          </MuiPickersUtilsProvider>
          <SnackBar handleSnackBarChange={handleSnackBarChange} {...msgInfo} />
        </MenuContext.Provider>
      </SnackBarContext.Provider>
    </AuthContext.Provider>
  );
}

GlobalContexts.propTypes = {
  children: PropTypes.element.isRequired
};
export default memo(withRouter(GlobalContexts));
