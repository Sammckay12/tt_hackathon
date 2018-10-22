import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Button, FaIcon } from 'legoland-ui';
import { Dialog, Header, Logo, CountryButton, CountrySelector } from 'fm-demos-common';
import Help from './components/Help/Help';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';
import OnlineSearch from './services/OnlineSearch';
import OnlineRouting from './services/OnlineRouting';
import vehicles from './data/vehicles';

import './App.css';

const startPos = new mapboxgl.LngLat(12.575106, 55.638140);
const selectedVehicleIndex = 0;
const vehicle = {...vehicles[selectedVehicleIndex]};
vehicle.coordinates = startPos;

const initialState = {
  selectedVehicleIndex,
  vehicle,
  destination: null,
  routes: null,
  chargingpark: null,
  errorMessage: null,
  mapProps: {
    center: startPos,
    zoom: [10],
    fitBounds: null,
    fitBoundsOptions: {padding: {top: 35, right: 35, left: 370, bottom: 35}}
  },
  activeRoute: 'normal',
  activePanel: 'settings',
  selectedCountry: 'DK',
  showCountrySelector: false,
  showHelp: false,
  showBuildIt: false
};

class App extends Component {

  state = JSON.parse(JSON.stringify(initialState));

  render () {
    const {
      selectedVehicleIndex,
      vehicle,
      destination,
      routes,
      chargingpark,
      mapProps,
      activeRoute,
      activePanel,
      errorMessage,
      mapCenter,
      selectedCountry,
      showCountrySelector,
      showHelp
    } = this.state;

    return (
      <div className="App">
        <Dialog
           title="Select Country"
           onClose={this.onCountrySelectorClose}
           onMaskClick={this.onCountrySelectorClose}
           show={showCountrySelector}>
          <CountrySelector onSelect={this.onCountrySelect}/>
        </Dialog>
        <Dialog
           title="Help"
           onClose={this.onHelpClose}
           onMaskClick={this.onHelpClose}
           show={showHelp}
           >
          <Help/>
        </Dialog>
        <Header>
          <Logo product="EV Assistant"/>
          <div className="Header-spacer"/>
          <Button
             className="ResetButton"
             onClick={this.onReset}
             ghost
             >
            Reset
          </Button>
          <Button
             className="BuildItButton"
             onClick={this.onShowBuildIt}
             ghost
             >
            Build It!
          </Button>
          <Button
             className="HelpButton"
             icon={<FaIcon type="question"/>}
             onClick={this.onShowHelp}
             ghost
             />
          <CountryButton
             countryCode={selectedCountry}
             onClick={this.onCountrySelectorOpen}
             />
        </Header>
        <div className="App-content">
          <Map {...mapProps}
               vehicle={vehicle}
               destination={destination}
               routes={routes}
               chargingpark={chargingpark}
               activeRoute={activeRoute}
               reverseGeocodeFn={OnlineSearch.reverseGeocode}
               reachableRangeFn={OnlineRouting.reachableRange}
               onMoveEnd={this.onMapMoveEnd}
               onGeolocate={this.geolocate}
               onVehicleChange={this.onVehicleChange}
               onDestinationChange={this.onDestinationChange}
               onDestinationReverseGeocode={this.onDestinationReverseGeocode}
               onActiveRouteChange={this.onActiveRouteChange}
               onShowReachableRangeChange={this.onShowReachableRangeChange}
               onFitBounds={this.onFitBounds}
               />
          <Sidebar
            activePanel={activePanel}
            selectedVehicleIndex={selectedVehicleIndex}
            vehicle={vehicle}
            destination={destination}
            routes={routes}
            chargingpark={chargingpark}
            activeRoute={activeRoute}
            errorMessage={errorMessage}
            searchFn={(query) => OnlineSearch.search(query, mapCenter)}
            onDestinationSelect={this.onDestinationSelect}
            onActiveRouteChange={this.onActiveRouteChange}
            onSearchClear={this.onSearchClear}
            onVehicleChange={this.onVehicleChange}
            onActivePanelChange={this.onActivePanelChange}
            />
        </div>
      </div>
    );
  }

  route () {
    const { vehicle, destination, activeRoute } = this.state;
    if (vehicle && destination) {
      OnlineRouting.batchRoute(vehicle, destination)
        .then(routes => {
          this.setState({errorMessage: null, routes, activePanel: 'vehicle', mapProps: Object.assign({}, this.state.mapProps, {fitBounds: routes[activeRoute].bounds})});
        })
        .catch((reason) => {
          const msg = `${reason.message}. Try moving the either the route start or end point`;
          this.setState({errorMessage: msg});
        });
    }
  }

  onShowHelp = () => {
    this.setState({showHelp: true});
  }

  onHelpClose = () => {
    this.setState({showHelp: false});
  }

  onShowBuildIt = () => {
    this.setState({showBuildIt: true});
  }

  onBuildItClose = () => {
    this.setState({showBuildIt: false});
  }

  onCountrySelect = (country) => {
    const sw = country.bbox[0];
    const ne = country.bbox[2];
    const bounds = [sw, ne];
    this.setState({selectedCountry: country.iso3166}, () => {
      this.onFitBounds(bounds);
    });
  }

  onCountrySelectorClose = () => {
    this.setState({showCountrySelector: false});
  }

  onCountrySelectorOpen = () => {
    this.setState({showCountrySelector: true});
  }

  onMapMoveEnd = (lngLat) => {
    this.setState({mapCenter: lngLat});
  }

  onVehicleChange = (vehicle, index) => {
    const selectedVehicleIndex = isNaN(index) ? this.state.selectedVehicleIndex : index;

    this.setState({
      selectedVehicleIndex,
      vehicle: Object.assign({}, this.state.vehicle, vehicle)
    }, () => this.route());
  }

  onActivePanelChange = (activePanel) => {
    this.setState({activePanel});
  }

  geolocate = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { longitude, latitude } = position.coords;
        const center = [longitude, latitude];
        this.setState({
          mapProps: Object.assign({}, this.state.mapProps, {center})
        });
      }, null, {maximumAge: 30000});
    }
  }

  onDestinationChange = (destination) => {
    this.setState({
      destination: Object.assign({}, this.state.destination, destination)
    }, () => this.route());
  }

  onDestinationSelect = (destination) => {
    this.setState({
      destination: Object.assign({}, this.state.destination, destination),
      mapProps: Object.assign({}, this.state.mapProps, {center: destination.coordinates})
    }, () => this.route());
  }

  onDestinationReverseGeocode = (destination) => {
    this.setState({destination: Object.assign({}, this.state.destination, {address: destination.address})});
  }

  onActiveRouteChange = (activeRoute) => {
    this.setState({activeRoute});
  }

  onFitBounds = (bounds) => {
    this.setState({
      mapProps: Object.assign({}, this.state.mapProps, {fitBounds: bounds})
    });
  }

  onSearchClear = () => {
    this.setState({destination: null, routes: null});
  }

  onReset = () => {
    // Deep clone initial state as react-mapbox-gl uses reference equality for detecting if map center and zoom have changed
    const copy = JSON.parse(JSON.stringify(initialState));
    this.setState({...copy});
  }
}

export default App;
