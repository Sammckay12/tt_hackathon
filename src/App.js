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
import SlideInOut from './transitions/SlideInOut';
import users from './data/users';
import kompasPlaces from './components/Help/places.json'

import './App.css';

const selectedUserIndex = 0;
const user = {...users[selectedUserIndex]};


const initialState = {
  selectedUserIndex,
  user,
  destination: null,
  recommendations: [],
  routes: {},
  chargingpark: null,
  errorMessage: null,
  mapProps: {
    center: user.coordinates,
    zoom: [10],
    fitBounds: null,
    fitBoundsOptions: {padding: {top: 35, right: 35, left: 370, bottom: 35}}
  },
  activeRoute: 'work',
  activePanel: 'settings',
  selectedCountry: 'GB',
  showCountrySelector: false,
  showHelp: false,
  showBuildIt: false,
  activeRoutes : true,
  showRoute1: false,
  showRoute2: false,
  showRoute3: false
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
      activeRoutes,
      showRoute1,
      showRoute2,
      showRoute3
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
               destinations={this.state.destinations}
               routes={routes}
               chargingpark={chargingpark}
               activeRoute={activeRoute}
               reverseGeocodeFn={OnlineSearch.reverseGeocode}
               reachableRangeFn={OnlineRouting.reachableRange}
               onMoveEnd={this.onMapMoveEnd}
               onGeolocate={this.geolocate}
               onUserChange={this.onUserChange}
               onSetUserPosition={this.onSetUserPosition}
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
            predictRoutes={this.fetchPredictedDestinations}
            onActivePanelChange={this.onActivePanelChange}
            />

          <SlideInOut leftSlider in={showRoute2}>
            { routes['work'] ? (
              <RouteTile routes={routes} routeLabel={'work'} strokeColor='#1c689f'removeRoutes={this.removeRoutes} />
            ) : (null)
            }
          </SlideInOut>

          <SlideInOut leftSlider in={showRoute1}>
          {  routes['normal'] ? (
              <RouteTile routes={routes} routeLabel={'school'} strokeColor='#3d99dd'removeRoutes={this.removeRoutes} marginTop={{marginTop: 70}} />
            ) : (null)}
          </SlideInOut>

          <SlideInOut leftSlider in={showRoute3}>
            {  routes['gym'] ? (
              <RouteTile routes={routes} routeLabel={'gym'} strokeColor='#bcdcf4'removeRoutes={this.removeRoutes} marginTop={{marginTop: 140}} />
            ) : (null)}
          </SlideInOut>

        </div>
      </div>
    );
  }

  fetchPredictedDestinations = (timeParameters) => {
    console.log("timeParameters", timeParameters)
    fetch(`http://localhost:8010/proxy/predict_destination/user42/lat44.8211475/lon20.3983179/time${timeParameters}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then((responseJson) => {
        responseJson.forEach((loc) => {
          loc['coordinates'] = {lng: loc.lon, lat: loc.lat}
        })
        this.setState({destinations: responseJson}, () => {this.route()} )
    })
  }


  removeRoutes = (keepOnly) => {

    if (keepOnly === 'work') {
      let work = this.state.routes['work'];
      console.log("work", work);
      console.log("kompasPlaces", kompasPlaces);
      this.setState({
        recommendations: kompasPlaces,
        routes: Object.assign({work: this.state.routes[keepOnly]}),
        showRoute1: false,
        showRoute3: false,
        destinations: [this.state.destinations[1]]
      })
    }
    if (keepOnly === 'gym') {
      this.setState({
        routes: Object.assign({}, {gym: this.state.routes[keepOnly]}),
        showRoute1: false,
        showRoute2: false,
        destinations: [this.state.destinations[2]]
      })
    }
    if (keepOnly === 'school') {
      this.setState({
        routes: Object.assign({}, {normal: this.state.routes['normal']}),
        showRoute2: false,
        showRoute3: false,
        destinations: [this.state.destinations[0]]
      })
    }
  }

  route () {
    const { user, destinations, activeRoute } = this.state;
    //
    // let destination1 = {coordinates: {lng:20.403418, lat: 44.840034}, type: 'work'}
    // let destination2 = {coordinates: {lng:20.400883, lat: 44.827453}, type: 'gym'}
    // const destinations = [destination, destination1, destination2]
    this.setState({destinations: destinations})

    if (user && destinations) {
      OnlineRouting.batchRoute(user, destinations)
        .then(routes => {

          // this.fetchRecommendations(user, routes)
          console.log("ROUTES", routes);
          this.setState({showRoute1: true, showRoute2: true, showRoute3: true, errorMessage: null, routes, activePanel: 'user', mapProps: Object.assign({}, this.state.mapProps, {fitBounds: routes[activeRoute].bounds})});
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

  onUserChange = (index) => {
    const selectedUserIndex = isNaN(index) ? this.state.selectedUserIndex : index;
    const user = users[selectedUserIndex];

    this.setState({
      selectedUserIndex,
      user
    });
  }

  onSetUserPosition = (coordinates) => {
    if (coordinates) {
      this.setState({
        user: Object.assign({}, this.state.user, {coordinates}) 
      });
    }
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
