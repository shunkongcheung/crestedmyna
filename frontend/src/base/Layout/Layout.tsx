import React, { ReactNode, memo, useState } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import NavDrawer from "./NavDrawer";

interface ILayoutProps {
  children: ReactNode;
  unAuth?: boolean;
}
function Layout({ children, unAuth = false }: ILayoutProps) {
  const headerHeight = 70;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div id="outer-container">
      {unAuth ? (
        undefined
      ) : (
        <NavDrawer
          headerHeight={headerHeight}
          isDrawerOpen={isDrawerOpen}
          outerContainerId="outer-container"
          pageWrapId="page-wrap"
setIsDrawerOpen={setIsDrawerOpen}
        />
      )}
      <main id="page-wrap">
        <Header headerHeight={headerHeight} setIsDrawerOpen={setIsDrawerOpen} />
        <div style={{ marginTop: headerHeight }} />
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  unAuth: PropTypes.bool
};

export default memo(Layout);
