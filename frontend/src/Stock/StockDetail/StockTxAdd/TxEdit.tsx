import React, { memo, useCallback, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { MdSettings } from "react-icons/md";

/* import StockProfileDialog from "./StockProfileDialog"; */
import StockTxAdd from "./StockTxAdd";

import classNames from "./TxEdit.module.scss";

interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
}
interface IStockTxSubmit {
  txType: "BUY" | "SELL";
  txAt: Date;
  shareCount: number;
  price: number;
}
interface ITxEditProps {
  handleStockProfileChange: (p: IStockProfile, f: any) => any;
  handleAddTx: (tx: IStockTxSubmit, f: any) => any;
  isProfileLoading: boolean;
  stockProfile: IStockProfile;
}

function TxEdit({
  handleAddTx,
  handleStockProfileChange,
  isProfileLoading,
  stockProfile
}: ITxEditProps) {
  const [isSettingModal, setIsSettingModal] = useState(false);
  const handleModalClose = useCallback(() => setIsSettingModal(false), []);
  const handleStockProfileChangeI = useCallback(
    async (profile, formApis) => {
      const ok = await handleStockProfileChange(profile, formApis);
      if (ok) setIsSettingModal(false);
    },
    [handleStockProfileChange]
  );
  /* const renderedDialog = useMemo( */
  /*   () => { */
  /*     if (isProfileLoading) return <></>; */
  /*     return ( */
  /*       <StockProfileDialog */
  /*         {...stockProfile} */
  /*         isModalOpen={isSettingModal} */
  /*         handleModalClose={handleModalClose} */
  /*         handleStockProfileChange={handleStockProfileChangeI} */
  /*       /> */
  /*     ); */
  /*   }, */
  /*   [ */
  /*     isProfileLoading, */
  /*     stockProfile, */
  /*     isSettingModal, */
  /*     handleModalClose, */
  /*     handleStockProfileChangeI */
  /*   ] */
  /* ); */

  /* {renderedDialog} */
  return (
    <>
      <div className={classNames.row}>
        <div className={classNames.addContainer}>
          <StockTxAdd handleAddTx={handleAddTx} />
        </div>
        <div className={classNames.setting}>
          <MdSettings onClick={() => setIsSettingModal(true)} />
        </div>
      </div>
    </>
  );
}

TxEdit.propTypes = {
  handleAddTx: PropTypes.func.isRequired,
  handleStockProfileChange: PropTypes.func.isRequired,
  isProfileLoading: PropTypes.bool.isRequired,
  stockProfile: PropTypes.shape({
    txStaticCost: PropTypes.number.isRequired,
    txProportionCost: PropTypes.number.isRequired
  }).isRequired
};
export default memo(TxEdit);
