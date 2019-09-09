import React, { memo } from "react";
import { push as Menu } from "react-burger-menu";
import { MdHome, MdShowChart, MdEvent } from "react-icons/md";
import PropTypes from "prop-types";

import classNames from "./NavDrawer.module.css";

const menuStyles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px"
  },
  bmBurgerBars: {
    background: "#373a47"
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
      <a id="home" className={classNames.navItem} href="/">
        <MdHome className={classNames.navItemIcon} />
        <span className={classNames.navItemTitle}>Home</span>
      </a>
      <a id="stock" className={classNames.navItem} href="/stock">
        <MdShowChart className={classNames.navItemIcon} />
        <span className={classNames.navItemTitle}>Stock</span>
      </a>
      <a id="journal" className={classNames.navItem} href="/journal">
        <MdEvent className={classNames.navItemIcon} />
        <span className={classNames.navItemTitle}>Journal</span>
      </a>
    </Menu>
  );
}
NavDrawer.propTypes = {
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired
};

export default memo(NavDrawer);
