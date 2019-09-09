import React, { ReactNode, memo } from "react";
import NavDrawer from "./NavDrawer";
import PropTypes from "prop-types";

interface ILayoutProps {
  children: ReactNode;
}
function Layout({ children }: ILayoutProps) {
  return (
    <div id="outer-container">
      <NavDrawer pageWrapId="page-wrap" outerContainerId="outer-container" />
      <main id="page-wrap">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default memo(Layout);
