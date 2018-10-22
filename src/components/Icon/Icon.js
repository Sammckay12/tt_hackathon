import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Icon.css';

const Icon = ({size, src, shadow}) => {
  const classes = classnames(
    'Icon',
    !shadow || 'shadow'
  );
  const style = {
    width: size,
    height: size,
    backgroundImage: `url(${src})`
  };
  return (
    <div className={classes} style={style}></div>
  );
};

Icon.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  src: PropTypes.string,
  shadow: PropTypes.bool
};

Icon.defaultProps = {
  size: 48
};

export default Icon;
