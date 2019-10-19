import React, { memo, useCallback, useMemo, useState } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

import StockProfileDialog from "./StockProfileDialog";

import classNames from "./PortfolioCtrl.module.scss";

interface IPortfolioCtrlProps {
  stockProfileState: {
    handleStockProfileChange: (p: IStockProfile, f: any) => Promise<boolean>;
    isLoading: boolean;
    stockProfile: IStockProfile;
  };
}
interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
}

function PortfolioCtrl({ stockProfileState }: IPortfolioCtrlProps) {
  const { handleStockProfileChange, stockProfile } = stockProfileState;

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const handleStockProfileChangeI = useCallback(
    async (profile, formApis) => {
      const ok = await handleStockProfileChange(profile, formApis);
      if (ok) setIsProfileOpen(false);
    },
    [handleStockProfileChange]
  );
  const renderedProfileRow = useMemo(
    () => (
      <>
        <div className={classNames.row}>
          <div className={classNames.title} />
          <div className={classNames.portfolioEditBtn}>
            <Button type="primary" onClick={() => setIsProfileOpen(true)}>
              EDIT PROFILE
            </Button>
          </div>
        </div>
      </>
    ),
    []
  );

  const renderedProfileDialog = useMemo(
    () => (
      <StockProfileDialog
        {...stockProfile}
        isModalOpen={isProfileOpen}
        handleStockProfileChange={handleStockProfileChangeI}
        handleModalClose={() => setIsProfileOpen(false)}
      />
    ),
    [stockProfile, handleStockProfileChangeI, isProfileOpen]
  );

  return (
    <>
      {renderedProfileDialog}
      {renderedProfileRow}
    </>
  );
}

PortfolioCtrl.propTypes = {
  stockProfileState: PropTypes.shape({
    handleStockProfileChange: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    stockProfile: PropTypes.shape({
      txStaticCost: PropTypes.number.isRequired,
      txProportionCost: PropTypes.number.isRequired
    }).isRequired
  })
};
export default memo(PortfolioCtrl);
