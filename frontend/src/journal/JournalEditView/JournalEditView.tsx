import React, { memo, useMemo } from "react";
import { History } from "history";

import Layout from "../../base/Layout";
import { FormArea } from "../../base/Form";

import JournalEditViewForm from "./JournalEditViewForm";
import useJournalEditViewState from "./useJournalEditViewState";

interface IJournalEditViewProps {
  history: History;
}

function JournalEditView({ history }: IJournalEditViewProps) {
  const {
    handleAddMedia,
    handleDeleteMedia,
    isFetchingInit,
    journalMaster,
    handleSubmit
  } = useJournalEditViewState(history);

  const renderedLoading = useMemo(() => {
    return (
      <FormArea
        banner={"JOURNAL"}
        withPadding
        handleSubmit={() => {}}
        isSubmitting={true}
      >
        <div style={{ marginBottom: "10rem" }} />
      </FormArea>
    );
  }, []);

  return (
    <Layout>
      {isFetchingInit ? (
        renderedLoading
      ) : (
        <JournalEditViewForm
          {...journalMaster}
          handleAddMedia={handleAddMedia}
          handleDeleteMedia={handleDeleteMedia}
          handleSubmit={handleSubmit}
        />
      )}
    </Layout>
  );
}

export default memo(JournalEditView);
