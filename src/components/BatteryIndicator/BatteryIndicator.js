import React from 'react';
import PropTypes from 'prop-types';

import './BatteryIndicator.css';

const GREEN = '#34b22d';
const ORANGE = '#ffa231';
const RED = '#fe001e';

const BatteryIndicator = ({charge, kWh, showPercentage, showKWh}) => {
  const chargeStyle = {
    width:`${charge}%`,
    backgroundColor: charge >= 50 ? GREEN : (charge <= 25 ? RED : ORANGE)
  };

  return (
    <div className="BatteryIndicator">
      {showPercentage && <div className="BatteryIndicator-percentage">{charge}%</div>}
      {showKWh && <div className="BatteryIndicator-kWh">{kWh}<span className="BatteryIndicator-kWh-units">kWh</span></div>}
      <div className="BatteryIndicator-body">
        <div className="BatteryIndicator-charge" style={chargeStyle}></div>
      </div>
      <div className="BatteryIndicator-terminal"></div>
    </div>
  );
};

BatteryIndicator.propTypes = {
  charge: PropTypes.number,
  kWh: PropTypes.number,
  showPercentage: PropTypes.bool,
  showKWh: PropTypes.bool
};

export default BatteryIndicator;
