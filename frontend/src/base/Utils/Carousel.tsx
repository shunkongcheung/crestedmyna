import React, { memo } from "react";
import PropTypes from "prop-types";

import { Carousel as RCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IImageItem {
  src: string;
  name: string;
}
interface ICarouselProps {
  imageItems: Array<IImageItem>;
}

function Carousel({ imageItems }: ICarouselProps) {
  return (
    <RCarousel autoPlay>
      {imageItems.map(itm => (
        <div>
          <img src={itm.src} alt="" />
          <p className="legend">{itm.name}</p>
        </div>
      ))}
    </RCarousel>
  );
}

Carousel.propTypes = {
  imageItems: PropTypes.array.isRequired
};
export default memo(Carousel);
