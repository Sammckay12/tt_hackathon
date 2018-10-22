import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CarouselProvider } from 'pure-react-carousel';
import { util } from 'fm-demos-common';
import Carousel from './Carousel';

import './VehicleCarousel.css';

class VehicleCarousel extends Component {

  render () {
    const { vehicles, currentSlide, onChange } = this.props;
    const iconSize = util.isIOS() ? 54 : 48;

    return (
      <CarouselProvider
         className="VehicleCarousel"
         naturalSlideWidth={iconSize}
         naturalSlideHeight={iconSize}
         totalSlides={vehicles.length}
         currentSlide={currentSlide}
         >
        <Carousel
           iconSize={iconSize}
           vehicles={vehicles}
           onChange={onChange}
           />
      </CarouselProvider>
    );
  }
}

VehicleCarousel.propTypes = {
  vehicles: PropTypes.array,
  currentSlide: PropTypes.number,
  onChange: PropTypes.func
};

VehicleCarousel.defaultProps = {
  currentSlide: 0
};

export default VehicleCarousel;
