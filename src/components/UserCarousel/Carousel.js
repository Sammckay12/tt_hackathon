import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider, Slide, DotGroup } from 'pure-react-carousel';
import Icon from '../Icon/Icon';
import { WithStore } from 'pure-react-carousel';

class Carousel extends Component {

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentSlide !== this.props.currentSlide) {
      this.props.onChange(nextProps.currentSlide);
    }
  }

  render () {
    const { users, iconSize } = this.props;
    const slides = users.map((user, idx) => (
      <Slide key={idx} index={idx}>
        <Icon size={iconSize} src={user.image}/>
      </Slide>
    ));

    return (
      <React.Fragment>
        <Slider style={{height: iconSize}}>
          {slides}
        </Slider>
        <DotGroup className="UserCarousel-dot-group"/>
      </React.Fragment>
    );
  }
}

Carousel.propTypes = {
  users: PropTypes.array,
  iconSize: PropTypes.number,
  onChange: PropTypes.func
};

Carousel.defaultProps = {
  iconSize: 48
};

export default WithStore(Carousel, state => ({
  currentSlide: state.currentSlide
}));
