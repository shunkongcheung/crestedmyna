import React, { memo, useMemo } from "react";
import { FormikProps } from "formik";

import { FormArea } from "../../Base/Form";
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
  const isLoading = useMemo(() => !journalMaster || journalMaster.id === -1, [
    journalMaster
  ]);
  const renderedLoading = useMemo(
    () => {
      if (!isLoading) return <></>;
      return (
        <FormArea
          banner="Journal"
          children={<></>}
          handleSubmit={() => {}}
          isSubmitting={true}
        />
      );
    },
    [isLoading]
  );
  const renderedForm = useMemo(
    () => {
      if (isLoading) return <></>;
      return (
        <JournalEditForm
          {...journalMaster}
          handleAddMedia={handleAddMedia}
          handleDeleteMedia={handleDeleteMedia}
          handleSubmit={handleSubmit}
        />
      );
    },
    [handleAddMedia, handleDeleteMedia, handleSubmit, isLoading, journalMaster]
  );

  return (
    <>
      {renderedForm}
      {renderedLoading}
    </>
  );
}

export default memo(JournalEdit);
