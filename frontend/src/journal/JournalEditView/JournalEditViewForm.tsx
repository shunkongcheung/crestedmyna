import React, { memo, useCallback } from "react";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { FormArea, InputDateTime, InputText } from "../../base/Form";
import DescField from "./DescField";
import MediaField from "./MediaField";

interface IMedia {
  accessUrl: string;
  name: string;
  id: number;
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

interface IFormikVal extends IJournalMasterVal, IMediaVal {}

interface IJournalEditViewFormProps {
  handleAddMedia: (
    name: string,
    file: File,
    f: FormikProps<IJournalMasterVal>
  ) => any;
  handleDeleteMedia: (id: number, f: FormikProps<IJournalMasterVal>) => any;
}

interface IFormikProps extends IJournalEditViewFormProps {
  handleSubmit: (v: IJournalMasterVal, f: any) => Promise<any>;
}

function JournalEditViewForm({
  handleAddMedia,
  handleDeleteMedia,
  ...formikProps
}: IJournalEditViewFormProps & FormikProps<IFormikVal>) {
  const { values } = formikProps;
  const { description, medias } = values;

  const handleAddMediaI = useCallback(
    (name: string, file: File) => handleAddMedia(name, file, formikProps),
    [formikProps, handleAddMedia]
  );
  const handleDeleteMediaI = useCallback(
    (id: number) => handleDeleteMedia(id, formikProps),
    [formikProps, handleDeleteMedia]
  );
  return (
    <FormArea
      banner="JOURNAL"
      handleSubmit={formikProps.handleSubmit}
      isSubmitting={formikProps.isSubmitting}
    >
      <InputText {...formikProps} label="Name" name="name" />
      <InputDateTime {...formikProps} label="Start at" name="startAt" />
      <InputDateTime {...formikProps} label="End at" name="endAt" />
      <InputText {...formikProps} label="Location" name="location" />
      <MediaField
        {...formikProps}
        handleAddMedia={handleAddMediaI}
        handleDeleteMedia={handleDeleteMediaI}
        medias={medias}
      />
      <DescField description={description} />
    </FormArea>
  );
}

JournalEditViewForm.propTypes = {
  handleAddMedia: PropTypes.func.isRequired,
  handleDeleteMedia: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default memo(
  withFormik<IFormikProps, IFormikVal>({
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      startAt: Yup.date().required(),
      endAt: Yup.date()
        .required()
        .when("startAt", (st: Date, schema: any) => {
          return schema.min(st);
        }),
      location: Yup.string().required(),
      description: Yup.string().required()
    }),
    handleSubmit: async (values, { props: { handleSubmit }, ...formApis }) => {
      const submitValues = {
        id: values.id,
        description: values.description,
        endAt: values.endAt,
        location: values.location,
        medias: values.medias,
        name: values.name,
        startAt: values.startAt
      };
      await handleSubmit(submitValues, formApis);
      formApis.setSubmitting(false);
    }
  })(JournalEditViewForm)
);
