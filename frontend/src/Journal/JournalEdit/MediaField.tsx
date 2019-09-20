import React, { memo } from "react";
import { FormikProps } from "formik";
import PropTypes from "prop-types";

import MediaAddBtn from "./MediaAddBtn";
import MediaItem from "./MediaItem";

interface IMediaVal {
  media: {
    name: string;
    file: File;
  };
}

interface IMedia {
  id: number;
  name: string;
  accessUrl: string;
}

interface IMediaFieldProps {
  handleAddMedia: (name: string, file: File) => any;
  handleDeleteMedia: (id: number) => any;
  medias: Array<IMedia>;
}

function MediaField({
  handleAddMedia,
  handleDeleteMedia,
  medias,
  ...formikProps
}: IMediaFieldProps & FormikProps<IMediaVal>) {
  return (
    <>
      <div
        className="MuiFormLabel-root"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "1rem",
          marginBottom: "0.5rem"
        }}
      >
        Media
      </div>
      <div>
        <MediaAddBtn handleAddMedia={handleAddMedia} {...formikProps} />
        {medias.map(itm => {
          const key = `MediaItem-${itm.id}`;
          return (
            <MediaItem
              {...itm}
              key={key}
              handleDeleteMedia={handleDeleteMedia}
            />
          );
        })}
      </div>
    </>
  );
}

MediaField.propTypes = {
  handleAddMedia: PropTypes.func.isRequired,
  handleDeleteMedia: PropTypes.func.isRequired,
  medias: PropTypes.array.isRequired
};
export default memo(MediaField);
