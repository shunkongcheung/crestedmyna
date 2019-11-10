import React, { memo, useCallback } from "react";
import { withFormik, FormikProps } from "formik";
import { Moment } from "moment";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { FormArea, InputText } from "../../Base/Form";
import InputDateTime from "../../Base/Form/InputDateTime2";
import DescField from "./DescField";
import MediaField from "./MediaField";

import classNames from "./JournalEditForm.module.scss";

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

interface IJournalEditFormProps {
  handleAddMedia: (name: string, file: File, f: FormikProps<any>) => any;
  handleDeleteMedia: (id: number, f: FormikProps<any>) => any;
}

interface IFormikProps extends IJournalEditFormProps {
  handleSubmit: (v: IJournalMasterVal, f: any) => Promise<any>;
}

function JournalEditForm({
  handleAddMedia,
  handleDeleteMedia,
  ...formikProps
}: IJournalEditFormProps & FormikProps<IFormikVal>) {
  const { values } = formikProps;
  const { startAt, endAt } = values;
  const { description, medias } = values;

  const handleAddMediaI = useCallback(
    (name: string, file: File) => handleAddMedia(name, file, formikProps),
    [formikProps, handleAddMedia]
  );
  const handleDeleteMediaI = useCallback(
    (id: number) => handleDeleteMedia(id, formikProps),
    [formikProps, handleDeleteMedia]
  );

  const disabledEndAt = useCallback(
    (endAt: Moment | undefined) => {
      if (!startAt || !endAt) return false;
      return startAt.valueOf() >= endAt.valueOf();
    },
    [startAt]
  );
  const disabledStartAt = useCallback(
    (startAt: Moment | undefined) => {
      if (!startAt || !endAt) return false;
      return startAt.valueOf() > endAt.valueOf();
    },
    [endAt]
  );

  return (
    <FormArea
      banner="JOURNAL"
      handleSubmit={formikProps.handleSubmit}
      isSubmitting={formikProps.isSubmitting}
    >
      <div className={classNames.inputContainer}>
        <InputText {...formikProps} label="Name" name="name" />
      </div>
      <div className={classNames.inputContainer}>
        <InputDateTime
          disabledDate={disabledStartAt}
          label="Start at"
          name="startAt"
        />
      </div>
      <div className={classNames.inputContainer}>
        <InputDateTime
          disabledDate={disabledEndAt}
          label="End at"
          name="endAt"
        />
      </div>
      <div className={classNames.inputContainer}>
        <InputText {...formikProps} label="Location" name="location" />
      </div>
      <MediaField
        {...formikProps as any}
        handleAddMedia={handleAddMediaI}
        handleDeleteMedia={handleDeleteMediaI}
        medias={medias}
      />
      <DescField
        setFieldValue={formikProps.setFieldValue}
        description={description}
      />
    </FormArea>
  );
}

JournalEditForm.propTypes = {
  handleAddMedia: PropTypes.func.isRequired,
  handleDeleteMedia: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default memo(
  withFormik<IFormikProps, IFormikVal>({
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      startAt: Yup.mixed().required(),
      endAt: Yup.mixed().required(),
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
  })(JournalEditForm)
);
