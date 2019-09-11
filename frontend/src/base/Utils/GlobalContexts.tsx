import React, { memo, ReactNode } from "react";
import PropTypes from "prop-types";

import useAuthContextState from "../Auth/useAuthContextState";
import AuthContext from "../Auth/AuthContext";

interface IGlobalContextsProps {
  children: ReactNode;
}

function GlobalContexts({ children }: IGlobalContextsProps) {
  const tokenState = useAuthContextState();
  return (
    <AuthContext.Provider value={tokenState}>{children}</AuthContext.Provider>
  );
}

GlobalContexts.propTypes = {
  children: PropTypes.element.isRequired
};
export default memo(GlobalContexts);
