import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import { FaIcon } from 'legoland-ui';
import Tile from '../Tile/Tile';

import './RouteStats.css';

const RouteStats = ({route, user}) => {
  const {
    lengthInMeters,
    travelTimeInSeconds,
  } = route.summary;

  return (
    <div className="RouteStats">
      <div className="flex-horizontal mt-20 mb-20">
        <Tile
           value={(lengthInMeters/1000).toFixed(1)}
           units="km"
           label="Distance"
           />
        <Tile
           value={moment.duration(travelTimeInSeconds, 'seconds').format('h:mm')}
           units={(travelTimeInSeconds > 3600 ? 'hr' : 'min')}
           label="Time"
           />
      </div>
    </div>
  );
};

RouteStats.propTypes = {
  route: PropTypes.object,
  user: PropTypes.object
};

export default RouteStats;
