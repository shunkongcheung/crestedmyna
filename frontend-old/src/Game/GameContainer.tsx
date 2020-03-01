import React, { memo, useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";

import Layout from "../Base/Layout";

import GmeMenu from "./GmeMenu";
import GmeSudoku from "./GmeSudoku";
import useGameContainer from "./useGameContainer";

function GameContainer({ history }: RouteComponentProps) {
  const { menuState, sudokuState } = useGameContainer(history);

  const renderedSudoku = useMemo(() => <GmeSudoku {...sudokuState} />, [
    sudokuState
  ]);

  return (
    <Layout>
      <GmeMenu {...menuState} renderedSudoku={renderedSudoku} />
    </Layout>
  );
}

export default memo(GameContainer);
