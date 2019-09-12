import React, { memo, useCallback, useMemo } from "react";
import { animated, useTrail } from "react-spring";

import Layout from "../base/Layout/Layout";

import LinkBanner from "./LinkBanner";
import journalBannerImg from "./images/journalBanner.jpg";
import stockBannerImg from "./images/stockBanner.jpeg";
import classes from "./HomeView.module.scss";

const config = { mass: 5, tension: 2000, friction: 200 };
const from = { opacity: 0, x: 20 };
const trailSetting = { config, opacity: 1, x: 0, from };

function HomeView() {
  const renderedBanners = useMemo(
    () => [
      <LinkBanner
        name="JOURNAL"
        imageSrc={journalBannerImg}
        linkTo="/journal"
      />,
      <LinkBanner name="STOCK" imageSrc={stockBannerImg} linkTo="/stock" />
    ],
    []
  );
  const trail = useTrail(renderedBanners.length, trailSetting);
  const transform = useCallback(
    x => x.interpolate((x: number) => `translate3d(0,${x}px,0)`),
    []
  );

  const renderBanner = useCallback(
    ({ x, ...rest }, index) => {
      const key = `linkBanner-${index}`;
      return (
        <animated.div
          className={classes.col6}
          key={key}
          style={{ ...rest, transform: transform(x) }}
        >
          {renderedBanners[index]}
        </animated.div>
      );
    },
    [renderedBanners, transform]
  );

  return (
    <Layout>
      <div className={classes.row}>{trail.map(renderBanner)}</div>
    </Layout>
  );
}

export default memo(HomeView);
