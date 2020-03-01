import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import Headline from "./Headline";
import classNames from "./HmeNews.module.scss";

interface IHeadline {
  author?: string;
  description: string;
  publishAt: Date;
  title: string;
  thumbnail?: string;
  url: string;
}

interface IHmeNewsProps {
  headlines: Array<IHeadline>;
}

function HmeNews({ headlines }: IHmeNewsProps) {
  const renderedHeadlines = useMemo(
    () =>
      headlines.map((headline, idx) => {
        const key = `Headline-${idx}`;
        return <Headline {...headline} key={key} />;
      }),
    [headlines]
  );
  return (
    <>
      <div className={classNames.title}>NEWS</div>
      <div className={classNames.headlines}>{renderedHeadlines}</div>
    </>
  );
}

HmeNews.propTypes = {
  headlines: PropTypes.array.isRequired
};
export default memo(HmeNews);
