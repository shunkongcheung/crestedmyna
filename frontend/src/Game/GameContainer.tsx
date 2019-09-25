import React, { memo } from "react";
import { RouteComponentProps } from "react-router-dom";

import Layout from "../Base/Layout";

import GmeMenu from "./GmeMenu";
import useGameContainer from "./useGameContainer";

function GameContainer({ history }: RouteComponentProps) {
  const { menuState } = useGameContainer(history);
  return (
    <Layout>
      Game!
      <GmeMenu {...menuState} />
    </Layout>
  );
}

export default memo(GameContainer);
