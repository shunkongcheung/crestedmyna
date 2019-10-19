import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { useGetPrettyNum } from "../../hooks";

import SectorField from "./SectorField";
import classNames from "./PortfolioSummary.module.scss";

interface IPortfolioSummaryProps {
  isLoading: boolean;
  handleSectorsChange: (s: Array<number>) => any;
  sectors: Array<{ name: string; id: number }>;
  marketValue: number;
  realizedValue: number;
  unrealizedValue: number;
}

function PortfolioSummary({
  isLoading,
  handleSectorsChange,
  sectors,
  marketValue,
  realizedValue,
  unrealizedValue
}: IPortfolioSummaryProps) {

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
            handleSectorsChange={handleSectorsChange}
            sectors={sectors}
          />
        </div>
      </div>
    ),
    [handleSectorsChange, sectors]
  );

  return (
    <>
      {renderedMarketValue}
      {renderedRealizedValue}
      {renderedUnealizedValue}
      {renderedSectorRow}
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
