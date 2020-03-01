import React, { memo, useMemo, useState } from "react";
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";

import classNames from "./Headline.module.scss";

interface IHeadlineProps {
  author?: string;
  description: string;
  publishAt: Date;
  title: string;
  thumbnail?: string;
  url: string;
}

function Headline({ author, title, thumbnail, url }: IHeadlineProps) {
  const [style, set] = useSpring(() => ({ opacity: 0.5 }));
  const [isImgLoaded, setIsImgLoaded] = useState(!thumbnail);

  const renderedContent = useMemo(
    () => {
      if (!isImgLoaded) return <></>;
      return (
        <div className={classNames.content}>
          <div className={classNames.title}>{title}</div>
        </div>
      );
    },
    [title, isImgLoaded]
  );
  return (
    <a href={url} target="__blank">
      <div
        className={classNames.container}
        onMouseEnter={() => set({ opacity: 0.2 })}
        onMouseLeave={() => set({ opacity: 0.5 })}
      >
        <img
          className={classNames.thumbnail}
          src={thumbnail}
          alt=""
          onLoad={() => setIsImgLoaded(true)}
        />
        <animated.div className={classNames.shadow} style={style} />
        {renderedContent}
      </div>
    </a>
  );
}

Headline.propTypes = {
  author: PropTypes.string,
  description: PropTypes.string.isRequired,
  publishAt: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  url: PropTypes.string.isRequired
};
export default memo(Headline);
