import React, { memo, useMemo } from "react";
import { FormikProps } from "formik";

import JournalEditForm from "./JournalEditForm";

interface IMedia {
  id: number;
  accessUrl: string;
  name: string;
}
interface IJournalMaster {
  name: string;
  description: string;
  id: number;
  location: string;
  medias: Array<IMedia>;
  endAt: Date;
  startAt: Date;
}

interface IMediaVal {
  media: {
    name: string;
    file: File;
  };
}

interface IJournalMasterVal {
  endAt: Date;
  description: string;
  id: number;
  location: string;
  medias: Array<IMedia>;
  name: string;
  startAt: Date;
}

interface IJournalEditProps {
  handleAddMedia: (name: string, media_file: File, formApis: any) => any;
  handleDeleteMedia: (
    id: number,
    formApis: FormikProps<IJournalMasterVal>
  ) => any;
  journalMaster?: IJournalMaster;
  handleSubmit: (j: IJournalMaster, f: FormikProps<IJournalMasterVal>) => any;
}

function JournalEdit({
  handleAddMedia,
  handleDeleteMedia,
  journalMaster,
  handleSubmit
}: IJournalEditProps) {
  const renderedForm = useMemo(
    () => {
      if (!journalMaster) return <></>;
      return (
        <JournalEditForm
          {...journalMaster}
          handleAddMedia={handleAddMedia}
          handleDeleteMedia={handleDeleteMedia}
          handleSubmit={handleSubmit}
        />
      );
    },
    [handleAddMedia, handleDeleteMedia, handleSubmit, journalMaster]
  );

  return <>{renderedForm}</>;
}

export default memo(JournalEdit);
