import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaIcon } from 'legoland-ui';
import Icon from '../Icon/Icon';
import SettingsIcon from '../SettingsIcon/SettingsIcon';
import Field from '../Field/Field';
import BatteryIndicator from '../BatteryIndicator/BatteryIndicator';
import Search from '../Search/Search';
import TabPanel from '../TabPanel/TabPanel';
import Tab from '../Tab/Tab';
import RouteStats from '../RouteStats/RouteStats';

import './VehiclePanel.css';

class VehiclePanel extends Component {

  render () {
    const {
      vehicle,
      destination,
      routes,
      activeRoute,
      errorMessage,
      onDestinationSelect,
      onSearchClear,
      onSettings
    } = this.props;

    const { consumptionModel } = vehicle;
    const charge = Math.floor(consumptionModel.currentChargeInkWh/consumptionModel.maxChargeInkWh*100);

    return (
      <div className="VehiclePanel">
        <div className="flex-horizontal flex-space-between mb-30">
          <div className="flex-horizontal">
            <Icon size="3rem" src={vehicle.image}/>
            <div className="VehiclePanel-vehicle-name">{vehicle.make} {vehicle.model}</div>
          </div>
          <button
             className="VehiclePanel-menu-button"
             onClick={onSettings}
             >
            <SettingsIcon/>
          </button>
        </div>
        <h1>Battery</h1>
        <div className="mb-15">
          <Field label="Current Charge">
            <BatteryIndicator
               charge={charge}
               kWh={consumptionModel.currentChargeInkWh}
               showKWh
               />
          </Field>
        </div>
        <div className="mb-30">
          <Field label="Plug">
            {vehicle.connectorType}
          </Field>
        </div>
        <h1>Route</h1>
        <div>
          <Search
             value={destination ? destination.address.freeformAddress : ''}
             searchFn={this.onSearch}
             onSelect={onDestinationSelect}
             onClear={onSearchClear}
             />
        </div>
        {routes && (
          <TabPanel
             className="mt-30"
             activeTab={activeRoute === 'normal' ? 0 : 1}
             onChange={this.onTabChange}
             >
            <Tab label="Normal">
              <RouteStats
                 vehicle={vehicle}
                 route={routes.normal}
                 />
            </Tab>
            <Tab label="Eco">
              <RouteStats
                 vehicle={vehicle}
                 route={routes.eco}
                 />
            </Tab>
          </TabPanel>
        )}
      {errorMessage && (
        <div className="VehiclePanel-status flex-horizontal mt-30">
          <FaIcon type="exclamation-circle" size={2}/>
          <span className="VehiclePanel-error-message">{errorMessage}</span>
        </div>
        )}
      </div>
    );
  }

  onSearch = (query) => {
    return this.props.searchFn(query)
      .catch(e => {
        console.log(e.message);
      });
  }

  onTabChange = (index) => {
    const activeRoute = index === 0 ? 'normal' : 'eco';
    this.props.onActiveRouteChange && this.props.onActiveRouteChange(activeRoute);
  }
}

VehiclePanel.propTypes = {
  vehicle: PropTypes.object,
  destination: PropTypes.object,
  routes: PropTypes.object,
  activeRoute: PropTypes.string,
  errorMessage: PropTypes.string,
  searchFn: PropTypes.func.isRequired,
  onDestinationSelect: PropTypes.func,
  onActiveRouteChange: PropTypes.func,
  onSearchClear: PropTypes.func,
  onSettings: PropTypes.func
};

export default VehiclePanel;
