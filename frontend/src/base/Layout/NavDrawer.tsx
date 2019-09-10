import React, { memo, useMemo } from "react";
import { push as Menu } from "react-burger-menu";
import PropTypes from "prop-types";

import NavDrawerItem from "./NavDrawerItem";

interface INavDrawerProps {
  headerHeight: number;
  pageWrapId: string;
  outerContainerId: string;
}
function NavDrawer({
  headerHeight,
  pageWrapId,
  outerContainerId
}: INavDrawerProps) {
  const menuStyles = useMemo(
    () => {
      const burgerHeight = 30;
      return {
        bmBurgerButton: {
          position: "fixed",
          width: "36px",
          height: `${burgerHeight}px`,
          left: "30px",
          top: `${(headerHeight - burgerHeight) / 2}px`
        },
        bmBurgerBars: {
          background: "#373a47",
          outline: "none"
        },
        bmBurgerBarsHover: {
          background: "#a90000"
        },
        bmCrossButton: {
          height: "24px",
          width: "24px"
        },
        bmCross: {
          display: "none"
        },
        bmMenuWrap: {
          position: "fixed",
          height: "100%"
        },
        bmMenu: {
          background: "#373a47",
          padding: "2.5em 1.5em 0",
          fontSize: "1.15em"
        },
        bmMorphShape: {
          fill: "#373a47"
        },
        bmItemList: {
          color: "#b8b7ad",
          paddingLeft: "3rem",
          paddingRight: "3rem",
          paddingTop: "0.8rem"
        },
        bmOverlay: {
          background: "rgba(0, 0, 0, 0.3)"
        }
      };
    },
    [headerHeight]
  );

  return (
    <Menu
      pageWrapId={pageWrapId}
      outerContainerId={outerContainerId}
      styles={menuStyles}
    >
      <NavDrawerItem navName="home" />
      <NavDrawerItem navName="stock" />
      <NavDrawerItem navName="journal" />
    </Menu>
  );
}
NavDrawer.propTypes = {
  headerHeight: PropTypes.number.isRequired,
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired
};

export default memo(NavDrawer);
