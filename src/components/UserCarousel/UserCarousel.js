import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CarouselProvider } from 'pure-react-carousel';
import { util } from 'fm-demos-common';
import Carousel from './Carousel';

import './UserCarousel.css';

class UserCarousel extends Component {

  render () {
    const { users, currentSlide, onChange } = this.props;
    const iconSize = util.isIOS() ? 54 : 48;

    return (
      <CarouselProvider
         className="UserCarousel"
         naturalSlideWidth={iconSize}
         naturalSlideHeight={iconSize}
         totalSlides={users.length}
         currentSlide={currentSlide}
         >
        <Carousel
           iconSize={iconSize}
           users={users}
           onChange={onChange}
           />
      </CarouselProvider>
    );
  }
}

UserCarousel.propTypes = {
  users: PropTypes.array,
  currentSlide: PropTypes.number,
  onChange: PropTypes.func
};

UserCarousel.defaultProps = {
  currentSlide: 0
};

export default UserCarousel;
