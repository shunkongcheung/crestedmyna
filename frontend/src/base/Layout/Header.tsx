import React, { memo } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

import classes from "./Header.module.scss";

interface IHeaderProps {
  headerHeight: number;
}

function Header({ headerHeight }: IHeaderProps) {
  return (
    <div className={classes.container} style={{ height: headerHeight }}>
      <div className={classes.siteName}>DAILY</div>
			<Link className={classes.rightCtrl} to="/uam/login/">SIGN IN</Link>
			<Link className={classes.registerCtrl} to="/uam/register/">REGISTER</Link>
    </div>
  );
}

Header.propTypes = {
  headerHeight: PropTypes.number.isRequired
};
export default memo(Header);
