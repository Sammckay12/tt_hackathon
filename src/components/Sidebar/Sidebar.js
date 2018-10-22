import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SlideInOut from '../../transitions/SlideInOut';
import VehiclePanel from '../VehiclePanel/VehiclePanel';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import EVPanel from '../EVPanel/EVPanel';
import { EV_API_BASE_URL } from '../../config';

import './Sidebar.css';

class Sidebar extends Component {

  render () {
    const {
      activePanel,
      vehicle,
      selectedVehicleIndex,
      chargingpark,
      onVehicleChange,
      onDestinationSelect
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
        <SlideInOut in={activePanel === 'vehicle'}>
          <VehiclePanel
             {...this.props}
             onSettings={this.onSettings}
             />
        </SlideInOut>
        <SlideInOut in={activePanel === 'ev'}>
          <EVPanel
             baseUrl={EV_API_BASE_URL}
             chargingpark={chargingpark}
             onBack={this.onBack}
             onRoute={onDestinationSelect}
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
