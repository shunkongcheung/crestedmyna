import React, { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { animated, useTrail } from "react-spring";

import Layout from "../Layout/Layout";

import classes from "./FourOFour.module.scss";

const items = [4, 0, 4];
const config = { mass: 5, tension: 2000, friction: 200 };

function FourOFour() {
  const trail = useTrail(items.length, {
    config,
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 20 }
  });
  const transform = useCallback(
    x => x.interpolate((x: number) => `translate3d(0,${x}px,0)`),
    []
  );

  const rendered404 = useMemo(
    () => {
      return trail.map(({ x, ...rest }, index) => {
        const key = items[index] + "-" + index;
        const className = index % 2 === 0 ? undefined : classes.bannerZero;
        return (
          <animated.div key={key} style={{ ...rest, transform: transform(x) }}>
            <animated.div className={className}>{items[index]}</animated.div>
          </animated.div>
        );
      });
    },
    [trail, transform]
  );
  return (
    <Layout>
      <div className={classes.containerOuter}>
        <div className={classes.containerInner}>
          <div className={classes.bannerContainer}>
            <h1 className={classes.banner404}>{rendered404}</h1>
          </div>
          <h2>The page you requested could not found</h2>
          <Link className={classes.homeAnchor} to="/">
            Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default memo(FourOFour);
