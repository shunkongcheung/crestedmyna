import React, { memo } from "react";
import { push as Menu } from "react-burger-menu";
import PropTypes from "prop-types";

import NavDrawerItem from "./NavDrawerItem";

const menuStyles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px"
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

interface INavDrawerProps {
  pageWrapId: string;
  outerContainerId: string;
}
function NavDrawer({ pageWrapId, outerContainerId }: INavDrawerProps) {
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
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired
};

export default memo(NavDrawer);
