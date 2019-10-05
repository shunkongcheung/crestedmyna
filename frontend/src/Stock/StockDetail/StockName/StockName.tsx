import React, { memo, useCallback, useMemo, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import SearchField from "./SearchField";

import classNames from "./StockName.module.scss";

interface IStockNameProps {
  handleStockSearch: (search: string) => any;
  handleStockMasterChange: (id: number) => any;
  isLoading: boolean;
  stockMasterNames: Array<{ name: string; id: number }>;
  stockName: string;
}

function StockName({
  handleStockSearch,
  handleStockMasterChange,
  isLoading,
  stockMasterNames,
  stockName
}: IStockNameProps) {
  const [isSearching, setIsSearching] = useState(false);
  const style = useSpring({
    x: isSearching && !isLoading ? 1 : 0
  });
  const searchFieldStyle = useMemo(
    () => ({
      opacity: style.x,
      width: style.x.interpolate(v => `${v * 100}%`),
      height: style.x.interpolate(v => `${v * 100}%`)
    }),
    [style]
  );
  const handleStockMasterChangeI = useCallback(
    id => {
      setIsSearching(false);
      return handleStockMasterChange(id);
    },
    [handleStockMasterChange]
  );

  const handleStockSearchI = useCallback(
    stockCode => {
      setIsSearching(false);
      return handleStockSearch(stockCode);
    },
    [handleStockSearch]
  );

  const renderedStockName = useMemo(
    () => {
      if (!isLoading) return stockName;
      return <CircularProgress color="secondary" />;
    },
    [isLoading, stockName]
  );

  return (
    <div className={classNames.container}>
      <div className={classNames.displayNameContainer}>
        <div className={classNames.displayName}>{renderedStockName}</div>
        <div
          className={classNames.displayFilterBtn}
          onClick={() => setIsSearching(oVal => !oVal)}
        >
          <MdFilterList />
        </div>
      </div>
      <div className={classNames.searchFieldContainer}>
        <animated.div style={searchFieldStyle}>
          <SearchField
            handleStockSearch={handleStockSearchI}
            handleStockMasterChange={handleStockMasterChangeI}
            stockMasters={stockMasterNames}
          />
        </animated.div>
      </div>
    </div>
  );
}

StockName.propTypes = {
  handleStockSearch: PropTypes.func.isRequired,
  handleStockMasterChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  stockMasterNames: PropTypes.array.isRequired,
  stockName: PropTypes.string.isRequired
};
export default memo(StockName);
