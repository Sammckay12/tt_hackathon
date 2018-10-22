import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Tile.css';

const Tile = ({value, label, units, highlight}) => {
  const classes = classnames(
    'Tile',
    !highlight || 'Tile-highlight'
  );

  return (
    <div className={classes}>
      <div className="Tile-value">
        {value}
        {units && <span className="Tile-units">{units}</span>}
      </div>
      <div className="Tile-label">
        {label}
      </div>
    </div>
  );
};

Tile.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  label: PropTypes.string,
  units: PropTypes.string,
  highlight: PropTypes.bool
};

export default Tile;
