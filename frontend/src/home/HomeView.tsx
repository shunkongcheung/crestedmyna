import React, { memo } from "react";

import Layout from "../base/Layout/Layout";

import LinkBanner from "./LinkBanner";
import journalBannerImg from "./images/journalBanner.jpg";
import stockBannerImg from "./images/stockBanner.jpeg";
import classes from "./HomeView.module.scss";

function HomeView() {
  return (
    <Layout>
      <h1 className={classes.pageName}>HOME</h1>
      <div className={classes.row}>
        <div className={classes.col6}>
          <LinkBanner
            name="JOURNAL"
            imageSrc={journalBannerImg}
            linkTo="/journal"
          />
        </div>
        <div className={classes.col6}>
          <LinkBanner name="STOCK" imageSrc={stockBannerImg} linkTo="/stock" />
        </div>
      </div>
    </Layout>
  );
}

export default memo(HomeView);
