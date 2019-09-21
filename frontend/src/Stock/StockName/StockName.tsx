import React, { memo, useCallback, useMemo, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";

import SearchField from "./SearchField";

import classNames from "./StockName.module.scss";

interface IStockNameProps {
  handleStockSearch: (search: string) => any;
  handleStockMasterChange: (id: number) => any;
  isLoading: boolean;
  stockMasters: Array<{ name: string; id: number }>;
  stockName: string;
}

function StockName({
  handleStockSearch,
  handleStockMasterChange,
  isLoading,
  stockMasters,
  stockName
}: IStockNameProps) {
  const [isSearching, setIsSearching] = useState(false);
  const style = useSpring({
    x: isSearching ? 1 : 0
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

  return (
    <div className={classNames.container}>
        <div className={classNames.displayNameContainer}>
          <div className={classNames.displayName}>{stockName}</div>
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
              stockMasters={stockMasters}
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
  stockMasters: PropTypes.array.isRequired,
  stockName: PropTypes.string.isRequired
};
export default memo(StockName);
