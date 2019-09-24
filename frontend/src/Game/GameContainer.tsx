import React, { memo } from "react";
import Layout from "../Base/Layout";

import GmeMenu from "./GmeMenu";
import useGameContainer from "./useGameContainer";

function GameContainer() {
  const { menuState } = useGameContainer();
  return (
    <Layout>
      Game!
      <GmeMenu />
    </Layout>
  );
}

export default memo(GameContainer);
