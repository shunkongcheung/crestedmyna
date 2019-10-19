import React, { memo, useCallback, useMemo, useState } from "react";
import { Button, Input, Spin } from "antd";
import PropTypes from "prop-types";

import StockProfileDialog from "./StockProfileDialog";

import classNames from "./PortfolioCtrl.module.scss";

const { Search } = Input;

interface IPortfolioCtrlProps {
  stockSearchState: {
    handleStockSearch: (s: string) => any;
    isLoading: boolean;
  };
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

function PortfolioCtrl({
  stockSearchState,
  stockProfileState
}: IPortfolioCtrlProps) {
  const { handleStockProfileChange, stockProfile } = stockProfileState;

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const handleStockProfileChangeI = useCallback(
    async (profile, formApis) => {
      const ok = await handleStockProfileChange(profile, formApis);
      if (ok) setIsProfileOpen(false);
    },
    [handleStockProfileChange]
  );

  const renderedSearchField = useMemo(
    () => {
      const { handleStockSearch, isLoading } = stockSearchState;
      if (isLoading) return <Spin />;
      return (
        <Search placeholder="Enter stock code" onSearch={handleStockSearch} />
      );
    },
    [stockSearchState]
  );
  const renderedCtrlRow = useMemo(
    () => (
      <>
        <div className={classNames.row}>
          <div className={classNames.searchInput}>{renderedSearchField}</div>
          <div className={classNames.portfolioEditBtn}>
            <Button type="primary" onClick={() => setIsProfileOpen(true)}>
              EDIT PROFILE
            </Button>
          </div>
        </div>
      </>
    ),
    [renderedSearchField]
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
      {renderedCtrlRow}
    </>
  );
}

PortfolioCtrl.propTypes = {
  stockSearchState: PropTypes.shape({
    handleStockSearch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  }).isRequired,
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
