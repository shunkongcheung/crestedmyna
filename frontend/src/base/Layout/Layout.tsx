import React, { ReactNode, memo } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import NavDrawer from "./NavDrawer";

interface ILayoutProps {
  children: ReactNode;
}
function Layout({ children }: ILayoutProps) {
  const headerHeight = 70;
  return (
    <div id="outer-container">
      <NavDrawer
        headerHeight={headerHeight}
        pageWrapId="page-wrap"
        outerContainerId="outer-container"
      />
      <main id="page-wrap">
        <Header headerHeight={headerHeight} />
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default memo(Layout);
