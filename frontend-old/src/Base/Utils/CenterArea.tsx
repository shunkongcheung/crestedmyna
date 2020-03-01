import React, { memo, ReactNode } from "react";
import PropTypes from "prop-types";

import classes from "./CenterArea.module.scss";

interface ICenterAreaProps {
  children: ReactNode;
  withPadding?: boolean;
}

function CenterArea({ children, withPadding }: ICenterAreaProps) {
  const className =
    classes.containerInner +
    (withPadding ? ` ${classes.containerWithPadding}` : "");
  return (
    <div className={classes.containerOuter}>
      <div className={className}>{children}</div>
    </div>
  );
}

CenterArea.propTypes = {
  children: PropTypes.element.isRequired,
  withPadding: PropTypes.bool
};
export default memo(CenterArea);
