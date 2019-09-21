import React, { memo, useCallback, useState, useMemo } from "react";
import { MdSettings } from "react-icons/md";
import PropTypes from "prop-types";

import StockProfileDialog from "./StockProfileDialog";

import classNames from "./StockTxItem.module.scss";

interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
}
interface IStockTxHeaderProps {
  handleStockProfileChange: (p: IStockProfile, f: any) => any;
  isProfileLoading: boolean;
  stockProfile: IStockProfile;
}

function StockTxHeader({
  handleStockProfileChange,
  isProfileLoading,
  stockProfile
}: IStockTxHeaderProps) {
  const [isSettingModal, setIsSettingModal] = useState(false);
  const handleModalClose = useCallback(() => setIsSettingModal(false), []);
  const handleStockProfileChangeI = useCallback(
    async (profile, formApis) => {
      const ok = await handleStockProfileChange(profile, formApis);
      if (ok) setIsSettingModal(false);
    },
    [handleStockProfileChange]
  );
  const renderedDialog = useMemo(
    () => {
      if (isProfileLoading) return <></>;
      return (
        <StockProfileDialog
          {...stockProfile}
          isModalOpen={isSettingModal}
          handleModalClose={handleModalClose}
          handleStockProfileChange={handleStockProfileChangeI}
        />
      );
    },
    [
      isProfileLoading,
      stockProfile,
      isSettingModal,
      handleModalClose,
      handleStockProfileChangeI
    ]
  );

  return (
    <>
      {renderedDialog}
      <div className={classNames.headerContainer}>
        <div className={classNames.txTypeHeader}>TYPE</div>
        <div className={classNames.netValue}>NET VALUE</div>
        <div className={classNames.shareCount}>SHARE</div>
        <div className={classNames.price}>PRICE</div>
        <div className={classNames.grossValue}>GROSS VALUE</div>
        <div className={classNames.tradeCost}>COST</div>
        <div className={classNames.txAt}>
          <span className={classNames.txAtHeaderTxt}>DATE</span>
          <div className={classNames.setting}>
            <MdSettings onClick={() => setIsSettingModal(true)} />
          </div>
        </div>
      </div>
    </>
  );
}

StockTxHeader.propTypes = {
  handleStockProfileChange: PropTypes.func.isRequired,
  isProfileLoading: PropTypes.bool.isRequired,
  stockProfile: PropTypes.shape({
    txStaticCost: PropTypes.number.isRequired,
    txProportionCost: PropTypes.number.isRequired
  }).isRequired
};

export default memo(StockTxHeader);
