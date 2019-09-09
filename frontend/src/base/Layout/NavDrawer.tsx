import React, { memo } from "react";
import { push as Menu } from "react-burger-menu";
import PropTypes from "prop-types";

import classes from "./NavDrawer.module.css";

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
    background: "#bdc3c7"
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
    padding: "0.8em"
  },
  bmItem: {
    display: "inline-block"
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
      <a id="home" className={classes.navItem} href="/">
				<Home
      </a>
      <a id="about" className={classes.navItem} href="/about">
        About
      </a>
      <a id="contact" className={classes.navItem} href="/contact">
        Contact
      </a>
      <div className={classes.navItem}>Settings</div>
    </Menu>
  );
}
NavDrawer.propTypes = {
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired
};

export default memo(NavDrawer);
