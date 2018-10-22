import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { InputLabel, Input } from 'legoland-ui';
import BackIcon from '../BackIcon/BackIcon';
import VehicleCarousel from '../VehicleCarousel/VehicleCarousel';
import vehicles from '../../data/vehicles';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './SettingsPanel.css';

class SettingsPanel extends Component {

  state = {
    vehicle: {...this.props.vehicle},
    selectedVehicleIndex: this.props.selectedVehicleIndex
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.vehicle, nextProps.vehicle) || this.props.selectedVehicleIndex !== nextProps.selectedVehicleIndex) {
      this.setState({vehicle: {...nextProps.vehicle}, selectedVehicleIndex: nextProps.selectedVehicleIndex});
    }
  }

  render () {
    const { vehicle, selectedVehicleIndex } = this.state;
    const {
      vehicleEngineType,
      constantSpeedConsumptionInkWhPerHundredkm,
      vehicleWeight,
      currentChargeInkWh,
      maxChargeInkWh,
      auxiliaryPowerInkW,
      accelerationEfficiency,
      decelerationEfficiency,
      uphillEfficiency,
      downhillEfficiency
    } = this.state.vehicle.consumptionModel;

    return (
      <div className="SettingsPanel">
        <div className="SettingsPanel-header">
          <button
             className="SettingsPanel-back-button"
             onClick={this.onBack}
             >
            <BackIcon/>
          </button>
          <div className="SettingsPanel-title">{vehicle.make} {vehicle.model}</div>
        </div>
        <VehicleCarousel
           vehicles={vehicles}
           currentSlide={selectedVehicleIndex}
           onChange={this.onVehicleChange}
           />
        <form ref={node => this.form = node} action="" onSubmit={this.onSubmit}>
          {/* Hidden submit button to enable 'Go' button to submit form under iOS */}
          <Input
             type="submit"
             style={{visibility: 'hidden', position: 'absolute'}}
             />
          <Input
             type="hidden"
             name="vehicleEngineType"
             value={vehicleEngineType}
             />
          <Input
             type="hidden"
             name="constantSpeedConsumptionInkWhPerHundredkm"
             value={constantSpeedConsumptionInkWhPerHundredkm}
             />
          <div className="mb-20">
            <InputLabel>
              Vehicle Weight (kg)
            </InputLabel>
            <Input
               type="number"
               name="vehicleWeight"
               value={vehicleWeight}
               onChange={this.onFieldChange}
               />
          </div>
          <div className="mb-20">
            <InputLabel>
              Current Charge (kWh)
            </InputLabel>
            <Input
               type="number"
               name="currentChargeInkWh"
               max={maxChargeInkWh}
               value={currentChargeInkWh}
               onChange={this.onFieldChange}
               />
          </div>
          <div className="mb-20">
            <InputLabel>
              Max Charge (kWh)
            </InputLabel>
            <Input
               type="number"
               name="maxChargeInkWh"
               value={maxChargeInkWh}
               onChange={this.onFieldChange}
               />
          </div>
          <div className="mb-20">
            <InputLabel>
              Auxilary Power (kWh)
            </InputLabel>
            <Input
               type="number"
               step="0.01"
               name="auxiliaryPowerInkW"
               value={auxiliaryPowerInkW}
               onChange={this.onFieldChange}
               />
          </div>
          <div className="mb-20">
            <InputLabel>
              Acceleration Efficiency
            </InputLabel>
            <Input
               type="number"
               step="0.01"
               name="accelerationEfficiency"
               value={accelerationEfficiency}
               onChange={this.onFieldChange}
               />
          </div>
          <div className="mb-20">
            <InputLabel>
              Deceleration Efficiency
            </InputLabel>
            <Input
               type="number"
               step="0.01"
               name="decelerationEfficiency"
               value={decelerationEfficiency}
               onChange={this.onFieldChange}
               />
          </div>
          <div className="mb-20">
            <InputLabel>
              Uphill Efficiency
            </InputLabel>
            <Input
               type="number"
               step="0.01"
               name="uphillEfficiency"
               value={uphillEfficiency}
               onChange={this.onFieldChange}
               />
          </div>
          <div>
            <InputLabel>
              Downhill Efficiency
            </InputLabel>
            <Input
               type="number"
               step="0.01"
               name="downhillEfficiency"
               value={downhillEfficiency}
               onChange={this.onFieldChange}
               />
          </div>
        </form>
        <div className="SettingsPanel-button-bar flex-horizontal flex-flex-end">
          <button
             className="button-ev button-ev-ghost"
             onClick={this.onDefaultSettings}
             >
            <span>Default Settings</span>
          </button>
          <button
             className="button-ev button-ev-ghost"
             style={{marginLeft: 10}}
             onClick={this.onApply}
             >
            <span>Apply</span>
          </button>
        </div>
      </div>
    );
  }

  onVehicleChange = (index) => {
    this.setState({selectedVehicleIndex: index, vehicle: vehicles[index]});
  }

  onSubmit = (e) => {
    e.preventDefault();
    document.activeElement.blur();
    this.onApply();
  }

  onFieldChange = (e) => {
    const vehicle = {...this.state.vehicle};
    let { target: { name, value }} = e;
    value = isNaN(value) ? value : parseFloat(value);
    vehicle.consumptionModel = { ...vehicle.consumptionModel, [name]: value };
    this.setState({vehicle});
  }

  onApply = () => {
    const { vehicle, selectedVehicleIndex } = this.state;
    const { consumptionModel } = vehicle;

    vehicle.coordinates = this.props.vehicle.coordinates;

    if (consumptionModel.currentChargeInkWh > consumptionModel.maxChargeInkWh) {
      vehicle.consumptionModel = {...consumptionModel, currentChargeInkWh: consumptionModel.maxChargeInkWh};

      this.setState({vehicle}, () => {
        this.props.onVehicleChange(vehicle, selectedVehicleIndex);
        this.props.onBack();
      });
      return;
    }

    this.props.onVehicleChange(vehicle, selectedVehicleIndex);
    this.props.onBack();
  }

  onDefaultSettings = () => {
    const vehicle = vehicles[this.state.selectedVehicleIndex];
    this.setState({vehicle});
  }

  onBack = () => {
    this.setState(
      {vehicle: this.props.vehicle, selectedVehicleIndex: this.props.selectedVehicleIndex},
      () => this.props.onBack()
    );
  }
}

SettingsPanel.propTypes = {
  vehicle: PropTypes.object.isRequired,
  selectedVehicleIndex: PropTypes.number,
  onBack: PropTypes.func.isRequired,
  onVehicleChange: PropTypes.func.isRequired
};

export default SettingsPanel;
