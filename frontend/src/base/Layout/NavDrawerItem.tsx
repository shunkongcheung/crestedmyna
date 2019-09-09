import React, { createElement, memo, useMemo } from "react";
import { MdHome, MdShowChart, MdEvent } from "react-icons/md";
import PropTypes from "prop-types";

import classNames from "./NavDrawerItem.module.css";

type TNavName = "home" | "stock" | "journal";
interface INavDrawerItemProps {
  navName: TNavName;
}

function NavDrawerItem({ navName }: INavDrawerItemProps) {
  const iconClass = useMemo(
    () => {
      switch (navName) {
        case "home":
          return MdHome;
        case "stock":
          return MdShowChart;
        case "journal":
          return MdEvent;
        default:
          return MdHome;
      }
    },
    [navName]
  );
  const href = `/${navName}/list/`;
  return (
    <a id={navName} className={classNames.navItem} href={href}>
      {createElement(iconClass, { className: classNames.navItemIcon })}
      <span className={classNames.navItemTitle}>Home</span>
    </a>
  );
}

NavDrawerItem.propTypes = {
  navName: PropTypes.oneOf<TNavName>(["home", "stock", "journal"]).isRequired
};
export default memo(NavDrawerItem);
