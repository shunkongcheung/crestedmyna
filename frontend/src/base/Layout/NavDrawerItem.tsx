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
  const href = useMemo(
    () => {
      if (navName === "home") return "/";
      return `/${navName}/list/`;
    },
    [navName]
  );

  const isActive = useMemo(
    () => {
      const { pathname } = window.location;
      if (navName === "home" && pathname === "/") return true;
      return pathname.includes(navName);
    },
    [navName]
  );

  const navItemFinalClassName = useMemo(
    () => `${isActive ? classNames.navItemActive : ""} ${classNames.navItem}`,
    [isActive]
  );

  const title = useMemo(
    () => {
      switch (navName) {
        case "home":
          return "Home";
        case "stock":
          return "Stock";
        case "journal":
          return "Journal";
        default:
          return "Opps! Something went wrong";
      }
    },
    [navName]
  );

  return (
    <a id={navName} className={navItemFinalClassName} href={href}>
      {createElement(iconClass, { className: classNames.navItemIcon })}
      <span className={classNames.navItemTitle}>{title}</span>
    </a>
  );
}

NavDrawerItem.propTypes = {
  navName: PropTypes.oneOf<TNavName>(["home", "stock", "journal"]).isRequired
};
export default memo(NavDrawerItem);
