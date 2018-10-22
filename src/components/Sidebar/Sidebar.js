import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SlideInOut from '../../transitions/SlideInOut';
import SettingsPanel from '../SettingsPanel/SettingsPanel';

import './Sidebar.css';

class Sidebar extends Component {

  render () {
    const {
      activePanel,
      vehicle,
      selectedVehicleIndex,
      onVehicleChange
    } = this.props;

    return (
      <div className="Sidebar">
        <SlideInOut in={activePanel === 'settings'}>
          <SettingsPanel
             vehicle={vehicle}
             selectedVehicleIndex={selectedVehicleIndex}
             onBack={this.onBack}
             onVehicleChange={onVehicleChange}
             />
        </SlideInOut>
      </div>
    );
  }

  onBack = () => {
    this.props.onActivePanelChange('vehicle');
  }

  onSettings = () => {
    this.props.onActivePanelChange('settings');
  }
}

Sidebar.propTypes = {
  defaultConsumptionModel: PropTypes.object,
  activePanel: PropTypes.string,
  vehicle: PropTypes.object,
  selectedVehicleIndex: PropTypes.number,
  destination: PropTypes.object,
  routes: PropTypes.object,
  chargingpark: PropTypes.object,
  activeRoute: PropTypes.string,
  errorMessage: PropTypes.string,
  searchFn: PropTypes.func.isRequired,
  onDestinationSelect: PropTypes.func,
  onActiveRouteChange: PropTypes.func,
  onSearchClear: PropTypes.func,
  onVehicleChange: PropTypes.func,
  onActivePanelChange: PropTypes.func
};

export default Sidebar;
