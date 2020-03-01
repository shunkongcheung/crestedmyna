import React, { memo, useCallback, useState, useMemo } from "react";
import { MdInsertPhoto } from "react-icons/md";
import DropZone from "react-dropzone";
import { animated, useSpring } from "react-spring";
import { FormikProps } from "formik";
import PropTypes from "prop-types";

import { InputText } from "../../Base/Form";
import { Dialog } from "../../Base/Utils";

import classes from "./MediaAddBtn.module.scss";

interface IMediaVal {
  media: {
    name: string;
    file: File;
  };
}

interface IMediaAddBtnProps {
  handleAddMedia: (name: string, file: File) => any;
}

function MediaAddBtn({
  handleAddMedia,
  ...formikProps
}: IMediaAddBtnProps & FormikProps<IMediaVal>) {
  // props ---------------------------------------------------------------
  const { setFieldError, setFieldTouched, setFieldValue, values } = formikProps;
  // state ---------------------------------------------------------------
  const DEFAULT_X = 1;
  const [props, set] = useSpring(() => ({ x: 0 }));
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // methods -------------------------------------------------------------
  const handleAddConfirm = useCallback(
    async () => {
      const { media } = values;
      if (!media || !media.name || !media.file) {
        setFieldTouched("media.name" as any, true, false);
        setFieldError("media.name" as "media", "Required");
        return;
      }
      await handleAddMedia(values.media.name, values.media.file);
      setFieldValue("media", {});
      setIsDialogOpen(false);
      setFieldError("media.name" as "media", "");
      setFieldError("media.file" as "media", "");
    },
    [handleAddMedia, setFieldError, setFieldTouched, setFieldValue, values]
  );
  const handleDialogClose = useCallback(
    () => {
      setFieldError("media.name" as "media", "");
      setFieldError("media.file" as "media", "");
      setIsDialogOpen(false);
    },
    [setFieldError]
  );
  const handleFileDropped = useCallback(
    ([file]) => {
      const fileName = file.name.split(".")[0];
      if (!values.media || !values.media.name) {
        setFieldValue("media.name" as "media", fileName);
      }
      setFieldValue("media.file" as "media", file);
    },
    [setFieldValue, values]
  );

  // return -------------------------------------------------------------
  const style = useMemo(
    () => ({
      boxShadow: props.x.interpolate(x => `${x}rem ${x}rem ${x * 3}rem #ccc`)
    }),
    [props]
  );
  const renderedPreview = useMemo(
    () => {
      const file = values.media ? values.media.file : undefined;
      if (!file) return <></>;

      return (
        <div className={classes.previewContainer}>
          <img
            src={URL.createObjectURL(file)}
            alt=""
            className={classes.previewImg}
          />
        </div>
      );
    },
    [values]
  );

  return (
    <>
      <Dialog
        closeText="Discard"
        handleSubmit={handleAddConfirm}
        handleClose={handleDialogClose}
        isOpen={isDialogOpen}
        submitText="Create"
        title="Add image"
        textContent="Upload your image"
      >
        <div className={classes.fieldRow}>
          <div style={{ width: "80%" }}>
            <InputText {...formikProps} label="Description" name="media.name" />
          </div>
          <DropZone onDrop={handleFileDropped}>
            {({ getRootProps, getInputProps }) => {
              return (
                <>
                  <div {...getRootProps()} className={classes.mediaFileBtn}>
                    Upload
                  </div>
                  <input {...getInputProps()} />
                </>
              );
            }}
          </DropZone>
        </div>
        {renderedPreview}
      </Dialog>
      <div
        className={classes.itemContainer}
        onMouseEnter={() => set({ x: DEFAULT_X })}
        onMouseLeave={() => set({ x: 0 })}
      >
        <animated.div
          className={classes.itemContent}
          onClick={() => setIsDialogOpen(true)}
          style={style}
        >
          <MdInsertPhoto />
        </animated.div>
      </div>
    </>
  );
}

MediaAddBtn.propTypes = {
  handleAddMedia: PropTypes.func.isRequired
};
export default memo(MediaAddBtn);
