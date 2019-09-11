import React, { memo, useCallback, useContext, useMemo } from "react";
import { animated, useSpring } from "react-spring";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import AuthContext from "../Contexts/AuthContext";

import classes from "./Header.module.scss";

interface IHeaderProps {
  headerHeight: number;
}

function Header({ headerHeight, history }: IHeaderProps & RouteComponentProps) {
  const { expireAt, handleTokenChange } = useContext(AuthContext);
  const isLogined = useMemo(() => new Date(expireAt) >= new Date(), [expireAt]);
  const inStyle = useSpring({
    opacity: 1,
    from: { opacity: 0 }
  });

  const handleLogout = useCallback(
    () => {
      handleTokenChange("");
      history.push("/uam/login/");
    },
    [handleTokenChange, history]
  );

  const renderedAuthCtrl = useMemo(
    () => (
      <span className={classes.rightCtrl} onClick={handleLogout}>
        SIGN OUT
      </span>
    ),
    [inStyle, handleLogout]
  );
  const renderedUnAuthCtrl = useMemo(
    () => (
      <>
        <Link className={classes.rightCtrl} to="/uam/login/">
          SIGN IN
        </Link>
        <Link className={classes.registerCtrl} to="/uam/register/">
          REGISTER
        </Link>
      </>
    ),
    []
  );
  return (
    <animated.div
      className={classes.container}
      style={{ height: headerHeight, ...inStyle }}
    >
      <div className={classes.siteName}>DAILY</div>
      {isLogined ? renderedAuthCtrl : renderedUnAuthCtrl}
    </animated.div>
  );
}

Header.propTypes = {
  headerHeight: PropTypes.number.isRequired
};
export default memo(withRouter(Header));
