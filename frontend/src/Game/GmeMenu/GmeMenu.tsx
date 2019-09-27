import React, { memo, ReactNode, useCallback } from "react";
import { animated } from "react-spring";
import PropTypes from "prop-types";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";

import useToSideBtnStyle from "./useToSideBtnStyle";
import classNames from "./GmeMenu.module.scss";
import "rc-tabs/assets/index.css";

type TGame = "chess" | "sudoku" | "2048";

interface IGmeMenuProps {
  handleMenuChange: (s: "left" | "right") => any;
  renderedSudoku: ReactNode;
  selectedGame: TGame;
}

function GmeMenu({
  handleMenuChange,
  renderedSudoku,
  selectedGame
}: IGmeMenuProps) {
  const [
    toLeftStyle,
    handleMouseEnterOrPressLeft,
    handleMouseLeaveLeft
  ] = useToSideBtnStyle("left");
  const [
    toRightStyle,
    handleMouseEnterOrPressRight,
    handleMouseLeaveRight
  ] = useToSideBtnStyle("right");

  const handleLeftMouseUp = useCallback(
    () => {
      handleMouseLeaveLeft();
      handleMenuChange("left");
    },
    [handleMouseLeaveLeft, handleMenuChange]
  );
  const handleRightMouseUp = useCallback(
    () => {
      handleMouseLeaveRight();
      handleMenuChange("right");
    },
    [handleMouseLeaveRight, handleMenuChange]
  );

  return (
    <div className={classNames.container}>
      <Tabs
        activeKey={selectedGame}
        className={classNames.tabContainer}
        renderTabBar={() => <></>}
        renderTabContent={() => <TabContent />}
      >
        <TabPane tab="tab list" key="chess">
          <div className={classNames.tabContainer}>chess</div>
          
        </TabPane>
        <TabPane tab="tab detail" key="sudoku">
          <div className={classNames.tabContainer}>{renderedSudoku}</div>
        </TabPane>
        <TabPane tab="tab edit" key="2048">
          <div className={classNames.tabContainer}>2048</div>
        </TabPane>
      </Tabs>
      <animated.div
        className={classNames.toLeftBtn}
        style={toLeftStyle}
        onMouseEnter={handleMouseEnterOrPressLeft}
        onMouseLeave={handleMouseLeaveLeft}
        onMouseDown={handleMouseEnterOrPressLeft}
        onMouseUp={handleLeftMouseUp}
      >
        <div className={classNames.arrow}>{"<"}</div>
      </animated.div>
      <animated.div
        className={classNames.toRightBtn}
        style={toRightStyle}
        onMouseEnter={handleMouseEnterOrPressRight}
        onMouseLeave={handleMouseLeaveRight}
        onMouseDown={handleMouseEnterOrPressRight}
        onMouseUp={handleRightMouseUp}
      >
        <div className={classNames.arrow}>{">"}</div>
      </animated.div>
      <div className={classNames.ctrlBtns}>
        <button type="button">button</button>
      </div>
    </div>
  );
}

GmeMenu.propTypes = {
  handleMenuChange: PropTypes.func.isRequired,
  selectedGame: PropTypes.oneOf<TGame>(["chess", "sudoku", "2048"]).isRequired,
  renderedSudoku: PropTypes.element.isRequired
};
export default memo(GmeMenu);
