import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import { Carousel as RCarousel } from "react-responsive-carousel";

import classes from "./Carousel.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IImageItem {
  accessUrl: string;
  name: string;
}
interface ICarouselProps {
  imageItems: Array<IImageItem>;
}

function Carousel({ imageItems }: ICarouselProps) {
  const renderedImageItems = useMemo(
    () =>
      imageItems.map((itm, idx) => {
        const className = `legend ${classes.legend}`;
        const key = `carosual-${idx}`;
        return (
          <div key={key}>
            <img src={itm.accessUrl} alt="" />
            <p className={className}>{itm.name}</p>
          </div>
        );
      }),
    [imageItems]
  );
  return (
    <div className={classes.container}>
      <div className={classes.carousel}>
        <RCarousel autoPlay>{renderedImageItems}</RCarousel>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  imageItems: PropTypes.array.isRequired
};
export default memo(Carousel);
