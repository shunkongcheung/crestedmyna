import React, { memo } from "react";

import Drawer from "rc-drawer";

import styles from "./NavDrawer.module.css";
import "rc-drawer/assets/index.css";

function NavDrawer() {
  return (
    <Drawer>
      <div className={styles.container}>hihi</div>
    </Drawer>
  );
}

export default memo(NavDrawer);
