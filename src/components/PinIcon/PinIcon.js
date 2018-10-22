import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './PinIcon.css';

const PinIcon = ({type, size, color, shadow}) => {
  const classes = classnames(
    'PinIcon',
    !shadow || 'shadow'
  );
  const style = {
    width: size,
    height: size,
    backgroundColor: color
  };
  return (
    <div className={classes} style={style}>
      <span className={`fa fa-${type}`} style={{fontSize: `${Math.round(size/2, 10)}px`}}/>
    </div>
  );
};

PinIcon.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  color: PropTypes.string,
  shadow: PropTypes.bool
};

PinIcon.defaultProps = {
  type: 'map-marker',
  size: 32,
  color: '#3fa4ec'
};

export default PinIcon;
