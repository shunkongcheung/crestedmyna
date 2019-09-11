import React, { memo, useMemo } from "react";
import { push as Menu } from "react-burger-menu";
import PropTypes from "prop-types";

import NavDrawerItem from "./NavDrawerItem";

interface INavDrawerProps {
  headerHeight: number;
  isDrawerOpen: boolean;
  outerContainerId: string;
  pageWrapId: string;
  setIsDrawerOpen: (a: boolean) => void;
}
function NavDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  pageWrapId,
  outerContainerId
}: INavDrawerProps) {
  const menuStyles = useMemo(() => {
    return {
      bmBurgerButton: {
        display: "none"
      },
      bmBurgerBars: {},
      bmBurgerBarsHover: {},
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
  }, []);

  return (
    <Menu
      pageWrapId={pageWrapId}
      isOpen={isDrawerOpen}
      outerContainerId={outerContainerId}
      onStateChange={({ isOpen }) => setIsDrawerOpen(isOpen)}
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
  isDrawerOpen: PropTypes.bool.isRequired,
  outerContainerId: PropTypes.string.isRequired,
  pageWrapId: PropTypes.string.isRequired,
  setIsDrawerOpen: PropTypes.func.isRequired
};

export default memo(NavDrawer);
