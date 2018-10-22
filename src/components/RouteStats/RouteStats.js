import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import { FaIcon } from 'legoland-ui';
import Tile from '../Tile/Tile';

import './RouteStats.css';

const RouteStats = ({route, vehicle}) => {
  const {
    lengthInMeters,
    travelTimeInSeconds,
    batteryConsumptionInkWh,
    energySavingInkWh
  } = route.summary;

  const { currentChargeInkWh } = vehicle.consumptionModel;
  const insufficientCharge = batteryConsumptionInkWh > currentChargeInkWh;

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
      <div className="flex-horizontal">
        <Tile
           value={batteryConsumptionInkWh.toFixed(1)}
           units="kWh"
           label="Energy"
           />
        {energySavingInkWh !== undefined &&
        <Tile
           value={energySavingInkWh.toFixed(1)}
           units="kWh"
           label="Energy Saved"
           highlight
             />
        }
      </div>
      {insufficientCharge && (
        <div className="RouteStats-status flex-horizontal mt-30">
          <FaIcon type="exclamation-circle" size={2}/>
          <span className="RouteStats-status-msg">You will need to recharge to get to this destination</span>
        </div>
      )}
    </div>
  );
};

RouteStats.propTypes = {
  route: PropTypes.object,
  vehicle: PropTypes.object
};

export default RouteStats;
