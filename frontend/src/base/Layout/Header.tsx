import React, { memo } from "react";
import PropTypes from "prop-types";

import classes from "./Header.module.scss";

interface IHeaderProps {
  headerHeight: number;
}

function Header({ headerHeight }: IHeaderProps) {
  return (
    <div className={classes.container} style={{ height: headerHeight }}>
      <div className={classes.siteName}>DAILY</div>
      <div className={classes.rightCtrl}>SIGN IN</div>
      <div className={classes.registerCtrl}>REGISTER</div>
    </div>
  );
}

Header.propTypes = {
  headerHeight: PropTypes.number.isRequired
};
export default memo(Header);
