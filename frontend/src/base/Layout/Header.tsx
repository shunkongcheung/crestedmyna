import React, { memo, useCallback, useContext, useMemo } from "react";
import { animated, useSpring } from "react-spring";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import AuthContext from "../Contexts/AuthContext";

import classes from "./Header.module.scss";

interface IHeaderProps {
  headerHeight: number;
  setIsDrawerOpen: (a: (b: boolean) => boolean) => void;
}

function Header({
  headerHeight,
  history,
  setIsDrawerOpen
}: IHeaderProps & RouteComponentProps) {
  const { isLogined, handleTokenChange } = useContext(AuthContext);
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
    [handleLogout]
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
      <div
        className={classes.burgerContainer}
        onClick={() => setIsDrawerOpen(o => !o)}
      >
        <span className={classes.burgerBar} />
        <span className={classes.burgerBar} />
        <span className={classes.burgerBar} />
      </div>
      <Link className={classes.siteName} to="/">
        DAILY
      </Link>
      {isLogined ? renderedAuthCtrl : renderedUnAuthCtrl}
    </animated.div>
  );
}

Header.propTypes = {
  headerHeight: PropTypes.number.isRequired,
  setIsDrawerOpen: PropTypes.func.isRequired
};
export default memo(withRouter(Header));
