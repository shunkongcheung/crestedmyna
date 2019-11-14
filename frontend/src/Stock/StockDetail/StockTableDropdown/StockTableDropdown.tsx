import React, { memo, useMemo } from "react";
import { Dropdown, Menu } from "antd";
import PropTypes from "prop-types";

import classNames from "./StockTableDropdown.module.scss";

const { SubMenu } = Menu;

interface IStockTableDropdownProps {
  contentType: TContentType;
  setContentType: (c: TContentType) => any;
}
type TContentType = "shareHolders" | "notices" | "news" ;

function StockTableDropdown({
  contentType,
  setContentType
}: IStockTableDropdownProps) {
  const renderedMenu = useMemo(
    () => {
      return (
        <Menu
          onClick={({ key }) => setContentType(key as TContentType)}
          selectedKeys={[contentType]}
        >
          <Menu.Item key="shareHolders">
            <div>SUBSTANTIAL SHAREHOLDERS</div>
          </Menu.Item>
          <Menu.Item key="notices">
            <div>DISCLOSURE OF INTEREST</div>
          </Menu.Item>
          <Menu.Item key="news">
            <div>NEWS</div>
          </Menu.Item>
        </Menu>
      );
    },
    [contentType, setContentType]
  );

  const renderedTitle = useMemo(
    () => {
      switch (contentType) {
        case "notices":
          return "DISCLOSURE OF INTEREST";
        case "shareHolders":
          return "SUBSTANTIAL SHAREHOLDERS";
        case "news":
          return "NEWS";
        default:
          return "UNDEFINED";
      }
    },
    [contentType]
  );

  return (
    <Dropdown overlay={renderedMenu}>
      <h1 className={classNames.title}>{renderedTitle}</h1>
    </Dropdown>
  );
}

StockTableDropdown.propTypes = {};
export default memo(StockTableDropdown);
