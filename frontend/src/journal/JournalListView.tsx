import React, { memo } from "react";
import { RouteComponentProps } from "react-router-dom";

import Layout from "../base/Layout/Layout";

function JournalListView({ history, location }: RouteComponentProps) {
  return <Layout>journal list view</Layout>;
}

export default memo(JournalListView);
