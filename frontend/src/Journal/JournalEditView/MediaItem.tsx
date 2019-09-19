import React, { memo, useCallback, useState } from "react";
import { animated, useSpring } from "react-spring";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

import { Dialog } from "../../base/Utils";

import classes from "./MediaItem.module.scss";

interface IMediaItemProps {
  accessUrl: string;
  handleDeleteMedia: (id: number) => any;
  id: number;
}

function MediaItem({ accessUrl, handleDeleteMedia, id }: IMediaItemProps) {
  const DEFAULT_OPACITY = 0.3;
  const [props, set] = useSpring(() => ({
    opacity: 0
  }));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteConfirm = useCallback(
    async () => {
      await handleDeleteMedia(id);
      setIsDialogOpen(false);
    },
    [handleDeleteMedia, id]
  );

  return (
    <>
      <Dialog
        closeText="Discard"
        handleSubmit={handleDeleteConfirm}
        handleClose={() => setIsDialogOpen(false)}
        isOpen={isDialogOpen}
        submitText="Confirm"
        title="You are about to delete the image"
        textContent="You may no longer recover the image once you delete it. Please make sure you have backup the image in your local machine."
      />
      <div
        className={classes.itemContainer}
        onMouseEnter={() => set({ opacity: DEFAULT_OPACITY })}
        onMouseLeave={() => set({ opacity: 0 })}
      >
        <img
          className={classes.thumbnail}
          style={{ backgroundImage: `url(${accessUrl})` }}
          alt=""
        />
        <animated.div style={props} className={classes.shadow} />
        <div className={classes.deleteContainer}>
          <div
            className={classes.deleteBtn}
            onClick={() => setIsDialogOpen(true)}
          >
            <MdDelete />
          </div>
        </div>
      </div>
    </>
  );
}

MediaItem.propTypes = {
  accessUrl: PropTypes.string.isRequired,
  handleDeleteMedia: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};
export default memo(MediaItem);
