import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import { Carousel as RCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.scss";

interface IImageItem {
  src: string;
  name: string;
}
interface ICarouselProps {
  imageItems: Array<IImageItem>;
}

function Carousel({ imageItems }: ICarouselProps) {
  const renderedImageItems = useMemo(
    () =>
      imageItems.map(itm => {
        const className = `legend ${classes.legend}`;
        return (
          <div>
            <img src={itm.src} alt="" />
            <p className={className}>{itm.name}</p>
          </div>
        );
      }),
    [imageItems]
  );
  return <RCarousel autoPlay>{renderedImageItems}</RCarousel>;
}

Carousel.propTypes = {
  imageItems: PropTypes.array.isRequired
};
export default memo(Carousel);
