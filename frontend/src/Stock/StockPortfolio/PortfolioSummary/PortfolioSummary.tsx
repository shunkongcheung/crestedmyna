import React, { memo, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import { useGetPrettyNum } from "../../hooks";

import SectorField from "./SectorField";
import StockProfileDialog from "./StockProfileDialog";
import classNames from "./PortfolioSummary.module.scss";

interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
}
interface IPortfolioSummaryProps {
  isLoading: boolean;
  stockProfileState: {
    handleStockProfileChange: (p: IStockProfile, f: any) => Promise<boolean>;
    isLoading: boolean;
    stockProfile: IStockProfile;
  };
  handleSectorsChange: (s: Array<number>) => any;
  sectors: Array<{ name: string; id: number }>;
  marketValue: number;
  realizedValue: number;
  unrealizedValue: number;
}

function PortfolioSummary({
  isLoading,
  stockProfileState,
  handleSectorsChange,
  sectors,
  marketValue,
  realizedValue,
  unrealizedValue
}: IPortfolioSummaryProps) {
  const { handleStockProfileChange, stockProfile } = stockProfileState;
  console.log(stockProfile);

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const handleStockProfileChangeI = useCallback(
    async (profile, formApis) => {
      const ok = await handleStockProfileChange(profile, formApis);
      if (ok) setIsProfileOpen(false);
    },
    [handleStockProfileChange]
  );

  const { getPrettyNum } = useGetPrettyNum();
  const renderValueRow = useCallback(
    (title: string, value: number) => {
      const valuePretty = `$${getPrettyNum(value)}`;
      return (
        <div className={classNames.row}>
          <div className={classNames.title}>{title}</div>
          <div className={classNames.content}>{valuePretty}</div>
        </div>
      );
    },
    [getPrettyNum]
  );

  const renderedMarketValue = useMemo(
    () => renderValueRow("MARKET VALUE", marketValue),
    [renderValueRow, marketValue]
  );
  const renderedRealizedValue = useMemo(
    () => renderValueRow("REALIZED GAIN/LOSS", realizedValue),
    [renderValueRow, realizedValue]
  );
  const renderedUnealizedValue = useMemo(
    () => renderValueRow("UNREALIZED GAIN/LOSS", unrealizedValue),
    [renderValueRow, unrealizedValue]
  );
  const renderedSectorRow = useMemo(
    () => (
      <div className={classNames.row}>
        <div className={classNames.title}>SECTORS</div>
        <div className={classNames.selectField}>
          <SectorField
            {...stockProfile}
            handleSectorsChange={handleSectorsChange}
            sectors={sectors}
          />
        </div>
      </div>
    ),
    [handleSectorsChange, sectors, stockProfile]
  );
  const renderedProfileRow = useMemo(
    () => (
      <>
        <StockProfileDialog
					{...stockProfile}
          isModalOpen={isProfileOpen}
          handleStockProfileChange={handleStockProfileChangeI}
          handleModalClose={() => setIsProfileOpen(false)}
        />
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
    [handleStockProfileChangeI, isProfileOpen, stockProfile]
  );

  return (
    <>
      {renderedMarketValue}
      {renderedRealizedValue}
      {renderedUnealizedValue}
      {renderedSectorRow}
      {renderedProfileRow}
    </>
  );
}

PortfolioSummary.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleSectorsChange: PropTypes.func.isRequired,
  sectors: PropTypes.array.isRequired,
  marketValue: PropTypes.number.isRequired,
  realizedValue: PropTypes.number.isRequired,
  unrealizedValue: PropTypes.number.isRequired
};
export default memo(PortfolioSummary);
