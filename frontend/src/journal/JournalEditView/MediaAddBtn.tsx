import React, { memo, useCallback, useState, useMemo } from "react";
import { MdInsertPhoto } from "react-icons/md";
import DropZone from "react-dropzone";
import { animated, useSpring } from "react-spring";
import { FormikProps } from "formik";
import PropTypes from "prop-types";

import { InputText } from "../../base/Form";
import { Dialog } from "../../base/Utils";

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
  const { setFieldValue, values } = formikProps;
  // state ---------------------------------------------------------------
  const DEFAULT_X = 1;
  const [props, set] = useSpring(() => ({ x: 0 }));
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  // methods -------------------------------------------------------------
  const handleAddConfirm = useCallback(
    async () => {
      await handleAddMedia("name", "hihi" as any);
      setFieldValue("media", {});
      setIsDialogOpen(false);
    },
    [handleAddMedia, setFieldValue]
  );
  const handleFileDropped = useCallback(
    ([file]) => {
      const fileName = file.name.split(".")[0];
      if (!values.media || !values.media.name) {
        setFieldValue("media.name", fileName);
      }
      setFieldValue("media.file", file);
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem auto"
          }}
        >
          <img
            src={URL.createObjectURL(file)}
            alt=""
            style={{ width: "50%" }}
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
        handleClose={() => setIsDialogOpen(false)}
        isOpen={isDialogOpen}
        submitText="Create"
        title="Add image"
        textContent="Upload your image"
      >
        <div className={classes.fieldRow}>
          <InputText {...formikProps} label="Description" name="media.name" />
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
