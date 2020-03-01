import React, { memo, useCallback, useContext, useMemo } from "react";
import { animated, useTrail } from "react-spring";

import { MenuContext } from "../../Base/Contexts";

import LinkBanner from "./LinkBanner";
import journalBannerImg from "./images/journalBanner.jpg";
import gameBannerImg from "./images/gameBanner.jpeg";
import stockBannerImg from "./images/stockBanner.jpeg";
import classes from "./HmeRoute.module.scss";

const config = { mass: 5, tension: 2000, friction: 200 };
const from = { opacity: 0, x: 20 };
const trailSetting = { config, opacity: 1, x: 0, from };

function HmeRoute() {
  const { menu } = useContext(MenuContext);
  const renderedBanners = useMemo(
    () => {
      const banners = [];
      if (menu.includes("JOURNAL")) {
        banners.push(
          <LinkBanner
            name="JOURNAL"
            imageSrc={journalBannerImg}
            linkTo="/journal"
          />
        );
      }
      if (menu.includes("STOCK")) {
        banners.push(
          <LinkBanner name="STOCK" imageSrc={stockBannerImg} linkTo="/stock" />
        );
      }
      if (menu.includes("GAME")) {
        banners.push(
          <LinkBanner name="GAME" imageSrc={gameBannerImg} linkTo="/game" />
        );
      }
      return banners;
    },
    [menu]
  );

  const trail = useTrail(renderedBanners.length, trailSetting);
  const transform = useCallback(
    x => x.interpolate((x: number) => `translate3d(0,${x}px,0)`),
    []
  );

  const renderBanner = useCallback(
    ({ x, ...rest }, index) => {
      const key = "linkBanner-" + index;
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
    <>
      <div className={classes.title}>VISIT</div>
      <div className={classes.row}>{trail.map(renderBanner)}</div>
    </>
  );
}

export default memo(HmeRoute);
