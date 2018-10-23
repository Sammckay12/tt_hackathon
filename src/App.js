import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Button, FaIcon } from 'legoland-ui';
import { Dialog, Header, Logo, CountryButton, CountrySelector } from 'fm-demos-common';
import Help from './components/Help/Help';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';
import OnlineSearch from './services/OnlineSearch';
import OnlineRouting from './services/OnlineRouting';
import RouteTile from './components/RouteTile/RouteTile';
import users from './data/users';

import './App.css';

const selectedUserIndex = 0;
const user = {...users[selectedUserIndex]};

const initialState = {
  selectedUserIndex,
  user,
  destination: null,
  recommendations: [],
  routes: null,
  chargingpark: null,
  errorMessage: null,
  mapProps: {
    center: user.coordinates,
    zoom: [10],
    fitBounds: null,
    fitBoundsOptions: {padding: {top: 35, right: 35, left: 370, bottom: 35}}
  },
  activeRoute: 'normal',
  activePanel: 'settings',
  selectedCountry: 'GB',
  showCountrySelector: false,
  showHelp: false,
  showBuildIt: false,
  activeRoutes : true
};

class App extends Component {

  state = JSON.parse(JSON.stringify(initialState));

  render () {
    const {
      selectedUserIndex,
      user,
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
      showHelp,
      recommendations,
      activeRoutes
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
          <Logo product="GO Predict"/>
          <div className="Header-spacer"/>
          <Button
             className="ResetButton"
             onClick={this.onReset}
             ghost
             >
            Reset
          </Button>
          {/* <Button
             className="BuildItButton"
             onClick={this.onShowBuildIt}
             ghost
             >
            Build It!
          </Button> */}
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
               user={user}
               recommendations={recommendations}
               destination={destination}
               routes={routes}
               chargingpark={chargingpark}
               activeRoute={activeRoute}
               reverseGeocodeFn={OnlineSearch.reverseGeocode}
               reachableRangeFn={OnlineRouting.reachableRange}
               onMoveEnd={this.onMapMoveEnd}
               onGeolocate={this.geolocate}
               onUserChange={this.onUserChange}
               onDestinationChange={this.onDestinationChange}
               onDestinationReverseGeocode={this.onDestinationReverseGeocode}
               onActiveRouteChange={this.onActiveRouteChange}
               onShowReachableRangeChange={this.onShowReachableRangeChange}
               onFitBounds={this.onFitBounds}
               />
          <Sidebar
            activePanel={activePanel}
            selectedUserIndex={selectedUserIndex}
            user={user}
            destination={destination}
            routes={routes}
            chargingpark={chargingpark}
            activeRoute={activeRoute}
            errorMessage={errorMessage}
            searchFn={(query) => OnlineSearch.search(query, mapCenter)}
            onLocationSelect={this.onLocationSelect}
            onActiveRouteChange={this.onActiveRouteChange}
            onSearchClear={this.onSearchClear}
            onUserChange={this.onUserChange}
            onActivePanelChange={this.onActivePanelChange}
            />
          { activeRoutes ? (
            <RouteTile routeLabel='Home' routeEta='6:30pm' routeDelay='5' />
          ) : (
            null
          )
          }
        </div>
      </div>
    );
  }

  route () {
    const { user, destination, activeRoute } = this.state;
    console.log("destination", destination);
    let destination1 = {coordinates: 3}
    const destinations = []

    if (user && destination) {
      console.log("user", user);
      OnlineRouting.batchRoute(user, destination)
        .then(routes => {
          this.fetchRecommendations(user, routes)
          this.setState({errorMessage: null, routes, activePanel: 'settings', mapProps: Object.assign({}, this.state.mapProps, {fitBounds: routes[activeRoute].bounds})});
        })
        .catch((reason) => {
          const msg = `${reason.message}. Try moving the either the route start or end point`;
          this.setState({errorMessage: msg});
        });
    }
  }

  fetchRecommendations = (user, routes) => {
      fetch('http://localhost:3000/places/findTomTomPlaces', {
        method: 'POST',
        headers: {
          Accept: 'application/JSON',
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({
          "routes": routes.normal.coordinates})
    }).then((res) => res.json())
    .then((data) =>  this.setState({recommendations: data}))
    .catch((err)=>console.log(err))
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

  onUserChange = (user, index) => {
    const selectedUserIndex = isNaN(index) ? this.state.selectedUserIndex : index;

    this.setState({
      selectedUserIndex,
      user: Object.assign({}, this.state.user, user)
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
  console.log("destination", destination);
    this.setState({
      destination: Object.assign({}, this.state.destination, destination)
    }, () => this.route());
  }

  onLocationSelect = (location) => {
    this.setState({
      user: Object.assign({}, this.state.user, {coordinates: location.coordinates}),
      mapProps: Object.assign({}, this.state.mapProps, {center: location.coordinates})
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
