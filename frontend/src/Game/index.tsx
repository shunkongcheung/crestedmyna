import React, { memo } from "react";

import Sudoku from "./Sudoku";
import { Layout } from "../components";

function Game() {
  return (
    <Layout>
      <Sudoku />
    </Layout>
  );
}

export default memo(Game);
