import React, { memo } from "react";
import { Link } from "react-router-dom";

import classes from "./FourOFour.module.css";

function FourOFour() {
  return (
    <div className={classes.containerOuter}>
      <div className={classes.containerInner}>
        <div className={classes.bannerContainer}>
          <h1 className={classes.banner404}>
            <span className={classes.bannerFour}>4</span>
            <span className={classes.bannerZero}>0</span>
            <span className={classes.bannerFour}>4</span>
          </h1>
        </div>
        <h2>The page you requested could not found</h2>
        <Link className={classes.homeAnchor} to="/">
          Home
        </Link>
      </div>
    </div>
  );
}

export default memo(FourOFour);
