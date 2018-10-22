import React from 'react';
import PropTypes from 'prop-types';
import { Button, FaIcon } from 'legoland-ui';

import './MapPopup.css';

const MapPopup = ({
  coordinates,
  onClose,
  onRoute,
  onSetUserPosition
}) => {
  return (
    <div className="MapPopup">
      <div className="MapPopup-content">
        <Button flat onClick={() => onRoute(coordinates)} icon={<FaIcon type="flag-checkered"/>}>Route to here</Button>
        <Button flat onClick={() => onSetUserPosition(coordinates)} icon={<FaIcon type="car"/>}>Set user location</Button>
      </div>
    </div>
  );
};

MapPopup.propTypes = {
  coordinates: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  onClose: PropTypes.func.isRequired,
  onRoute: PropTypes.func.isRequired,
  onSetUserPosition: PropTypes.func.isRequired
};

export default MapPopup;
