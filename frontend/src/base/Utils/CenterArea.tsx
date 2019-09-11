import React, { memo, ReactNode } from "react";
import PropTypes from "prop-types";

import classes from "./CenterArea.module.scss";

interface ICenterAreaProps {
  children: ReactNode;
}

function CenterArea({ children }: ICenterAreaProps) {
  return (
    <div className={classes.containerOuter}>
      <div className={classes.containerInner}>{children}</div>
    </div>
  );
}

CenterArea.propTypes = {
  children: PropTypes.element.isRequired
};
export default memo(CenterArea);
