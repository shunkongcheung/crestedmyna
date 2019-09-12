import React, { ReactNode, memo, useMemo, useState } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import NavDrawer from "./NavDrawer";

import classes from "./Layout.module.scss";

interface ILayoutProps {
  children: ReactNode;
  unAuth?: boolean;
}
function Layout({ children, unAuth = false }: ILayoutProps) {
  const headerHeight = 70;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderedDrawer = useMemo(
    () => {
      if (unAuth) return <></>;
      return (
        <NavDrawer
          headerHeight={headerHeight}
          isDrawerOpen={isDrawerOpen}
          outerContainerId="outer-container"
          pageWrapId="page-wrap"
          setIsDrawerOpen={setIsDrawerOpen}
        />
      );
    },
    [headerHeight, isDrawerOpen, setIsDrawerOpen]
  );

  return (
    <div id="outer-container">
      {renderedDrawer}
      <main id="page-wrap">
        <Header headerHeight={headerHeight} setIsDrawerOpen={setIsDrawerOpen} />
        <div className={classes.container}>
          <div className={classes.content}>{children}</div>
        </div>
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  unAuth: PropTypes.bool
};

export default memo(Layout);
