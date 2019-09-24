import React, { createElement, memo, useMemo } from "react";
import { MdGames, MdHome, MdShowChart, MdEvent } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import classNames from "./NavDrawerItem.module.scss";

type TNavName = "HOME" | "GAME" | "STOCK" | "JOURNAL";
interface INavDrawerItemProps {
  navName: TNavName;
}

function NavDrawerItem({ navName }: INavDrawerItemProps) {
  const iconClass = useMemo(
    () => {
      switch (navName) {
        case "HOME":
          return MdHome;
        case "GAME":
          return MdGames;
        case "STOCK":
          return MdShowChart;
        case "JOURNAL":
          return MdEvent;
        default:
          return MdHome;
      }
    },
    [navName]
  );
  const href = useMemo(
    () => {
      if (navName === "HOME") return "/";
      return `/${navName.toLowerCase()}/`;
    },
    [navName]
  );

  const isActive = useMemo(
    () => {
      const { pathname } = window.location;
      if (navName === "HOME" && pathname === "/") return true;
      return pathname.includes(navName.toLowerCase());
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
        case "HOME":
          return "Home";
        case "GAME":
          return "Game";
        case "STOCK":
          return "Stock";
        case "JOURNAL":
          return "Journal";
        default:
          return "Opps! Something went wrong";
      }
    },
    [navName]
  );

  return (
    <Link id={navName} className={navItemFinalClassName} to={href}>
      {createElement(iconClass, { className: classNames.navItemIcon })}
      <span className={classNames.navItemTitle}>{title}</span>
    </Link>
  );
}

NavDrawerItem.propTypes = {
  navName: PropTypes.oneOf<TNavName>(["HOME", "STOCK", "JOURNAL"]).isRequired
};
export default memo(NavDrawerItem);
