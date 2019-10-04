import React, { memo } from "react";

import classNames from "./StockTxItem.module.scss";


function StockTxHeader() {
  return (
    <>
      <div className={classNames.headerContainer}>
        <div className={classNames.txTypeHeader}>TYPE</div>
        <div className={classNames.netValue}>NET VALUE</div>
        <div className={classNames.shareCount}>SHARE</div>
        <div className={classNames.price}>PRICE</div>
        <div className={classNames.grossValue}>GROSS VALUE</div>
        <div className={classNames.tradeCost}>COST</div>
        <div className={classNames.txAt}>
          <span className={classNames.txAtHeaderTxt}>DATE</span>
        </div>
      </div>
    </>
  );
}


export default memo(StockTxHeader);
