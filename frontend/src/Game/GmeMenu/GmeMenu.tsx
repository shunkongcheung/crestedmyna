import React, { memo, useCallback, useMemo } from "react";
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";

import classNames from "./GmeMenu.module.scss";
import "rc-tabs/assets/index.css";

interface IGmeMenuProps {}

function useToSideBtnStyle(toSide: "left" | "right") {
  const NORMAL_PERCENT = 100,
    HOVER_PERCENT = 50;
  const [rToSideStyle, set] = useSpring(() => ({
    bgImgPercent: NORMAL_PERCENT
  }));
  const getBackgroundImage = useCallback(
    () => {
      return rToSideStyle.bgImgPercent.interpolate(
        (x: number) =>
          `linear-gradient(to ${toSide}, #eee, rgba(214, 214, 214, 1) ${x}%)`
      );
    },
    [rToSideStyle, toSide]
  );
  const toSideStyle = useMemo(
    () => ({ backgroundImage: getBackgroundImage() } as any),
    [getBackgroundImage]
  );

  const handleMouseEnterOrPress = useCallback(
    () => set({ bgImgPercent: HOVER_PERCENT }),
    [set, HOVER_PERCENT]
  );
  const handleMouseLeave = useCallback(
    () => set({ bgImgPercent: NORMAL_PERCENT }),
    [set, NORMAL_PERCENT]
  );

  return [toSideStyle, handleMouseEnterOrPress, handleMouseLeave];
}

function GmeMenu({  }: IGmeMenuProps) {
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

  return (
    <div className={classNames.container}>
      <Tabs
        activeKey={"list"}
        renderTabBar={() => <></>}
        renderTabContent={() => <TabContent />}
        style={{ width: "100%", height: "100%" }}
      >
        <TabPane tab="tab list" key="list">
          <div style={{ width: "50vh", height: "50vh" }}>list</div>
        </TabPane>
        <TabPane tab="tab detail" key="detail">
          <div style={{ width: "50vh", height: "50vh" }}>detail</div>
        </TabPane>
        <TabPane tab="tab edit" key="edit">
          <div style={{ width: "50vh", height: "50vh" }}>edit</div>
        </TabPane>
      </Tabs>
      <animated.div
        className={classNames.toLeftBtn}
        style={toLeftStyle}
        onMouseEnter={handleMouseEnterOrPressLeft}
        onMouseLeave={handleMouseLeaveLeft}
        onMouseDown={handleMouseEnterOrPressLeft}
        onMouseUp={handleMouseLeaveLeft}
      >
        <div className={classNames.arrow}>{"<"}</div>
      </animated.div>
      <animated.div
        className={classNames.toRightBtn}
        style={toRightStyle}
        onMouseEnter={handleMouseEnterOrPressRight}
        onMouseLeave={handleMouseLeaveRight}
        onMouseDown={handleMouseEnterOrPressRight}
        onMouseUp={handleMouseLeaveRight}
      >
        <div className={classNames.arrow}>{">"}</div>
      </animated.div>
    </div>
  );
}

GmeMenu.propTypes = {};
export default memo(GmeMenu);
