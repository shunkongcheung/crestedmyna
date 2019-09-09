import React, { ReactNode, memo } from "react";
import NavDrawer from "./NavDrawer";
import PropTypes from "prop-types";

interface ILayoutProps {
  children: ReactNode;
}
function Layout({ children }: ILayoutProps) {
  return (
    <>
      <NavDrawer />
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default memo(Layout);
