import React, { memo, ReactNode } from "react";
import PropTypes from "prop-types";

import useAuthContextState from "../Auth/useAuthContextState";
import AuthContext from "../Auth/AuthContext";

import useMsgContextState from "./useMsgContextState";
import MsgContext from "./MsgContext";

interface IGlobalContextsProps {
  children: ReactNode;
}

function GlobalContexts({ children }: IGlobalContextsProps) {
  const tokenState = useAuthContextState();
	const msgState = useMsgContextState()
  return (
		<AuthContext.Provider value={tokenState}>
		<MsgContext.Provider value={msgState}>
			{children}
		</MsgContext.Provider>
		</AuthContext.Provider>
  );
}

GlobalContexts.propTypes = {
  children: PropTypes.element.isRequired
};
export default memo(GlobalContexts);
