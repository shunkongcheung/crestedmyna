import React, { memo } from "react";
import { animated, useSpring } from "react-spring";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./LinkBanner.module.scss";

interface ILinkBannerProps {
  imageSrc: string;
  linkTo: string;
  name: string;
}

function LinkBanner({ name, imageSrc, linkTo }: ILinkBannerProps) {
  const [props, set] = useSpring(() => ({ opacity: 0.4 }));
  return (
    <Link
      className={classes.link}
      to={linkTo}
      onMouseEnter={() => set({ opacity: 0.1 })}
      onMouseLeave={() => set({ opacity: 0.4 })}
    >
      <img className={classes.img} src={imageSrc} alt={linkTo} />
      <animated.div className={classes.shadow} style={props} />
      <h1 className={classes.name}>{name}</h1>
    </Link>
  );
}

LinkBanner.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default memo(LinkBanner);
