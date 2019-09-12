import React, { memo } from "react";
import { History } from "history";
import PropTypes from "prop-types";

import Layout from "../base/Layout/Layout";

interface IJournalDetailViewProps {
  history: History;
}

function JournalDetailView({ history }: IJournalDetailViewProps) {
  return <Layout>detailview</Layout>;
}

JournalDetailView.propTypes = {
  history: PropTypes.object.isRequired
};
export default memo(JournalDetailView);
