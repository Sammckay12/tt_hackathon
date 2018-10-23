import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import DraggableMarker from '../DraggableMarker/DraggableMarker';
import GeolocateControl from '../GeolocateControl/GeolocateControl';
import Icon from '../Icon/Icon';
import PinIcon from '../PinIcon/PinIcon';
import MapPopup from '../MapPopup/MapPopup';
import Route from '../Route/Route';
import { ZoomControl, AttributionControl, CompassControl } from 'fm-demos-common';
import mapStyle from './mono.json';

const ROUTE_ACTIVE_STYLE = {
  color: '#3fa4ec',
  strokeColor: '#127ece'
};

const ROUTE_ACTIVE_STYLE_WARNING = {
  color: '#e5706f',
  strokeColor: '#df4d4b'
};

const ROUTE_INACTIVE_STYLE = {
  color: '#ccc',
  strokeColor: '#999'
};

const MapboxGl = ReactMapboxGl({accessToken: '', attributionControl: false});

class Map extends Component {

  constructor (props) {
    super(props);

    this.state = {
      geolocating: false,
      popupCoordinates: null
    };
  }

  render () {
    const {
      center,
      zoom,
      fitBounds,
      fitBoundsOptions
    } = this.props;

    const { geolocating } = this.state;

    this.avoidLayers = [];

    const routes = this.renderRoutes();
    const markers = this.renderMarkers();
    const popup = this.renderPopup();

    return (
      <MapboxGl
         style={mapStyle}
         containerStyle={{width: '100%', height: '100%'}}
         center={center}
         zoom={zoom}
         fitBounds={fitBounds}
         fitBoundsOptions={fitBoundsOptions}
         onRender={this.onMapRender}
         onClick={this.onMapClick}
         onMoveEnd={this.onMoveEnd}
         >
        <ZoomControl/>
        <GeolocateControl
           active={geolocating}
           onClick={this.onGeolocate}
           />
        <CompassControl/>
        <AttributionControl/>
        {routes}
        {markers}
        {popup}
      </MapboxGl>
    );
  }

  renderRoutes () {
    const { routes } = this.props;
    const layers = [];

    if (routes) {
      layers.push(
        <Route
           id="route-normal"
           key="route-normal"
           coordinates={routes.normal.coordinates}
           {...(this.getRouteStyle('normal'))}
           properties={{route: 'normal'}}
           onClick={this.onRouteClick}
           />
      );
      this.avoidLayers = [...this.avoidLayers, 'route-normal'];
    }

    return layers;
  }

  getRouteStyle (routeType) {
    const { routes } = this.props;
    const route = routes[routeType];
  }

  renderMarkers () {
    const { user, destination } = this.props;
    const markers = [];

    if (user) {
      markers.push(
        <DraggableMarker
           coordinates={user.coordinates}
           key={`${user.model + '-' + user.coordinates.toString()}-user-marker`}
           anchor="center"
           onDragEnd={this.setUserPosition}
           draggable
           >
          <Icon size="2.8rem" src={user.image} shadow/>
        </DraggableMarker>
      );
    }
    if (destination) {
      markers.push(
        <DraggableMarker
           coordinates={destination.coordinates}
           key={`${destination.coordinates.toString()}-destination-marker`}
           anchor="bottom"
           onDragEnd={this.setDestinationPosition}
           draggable
           >
          <PinIcon size="2rem" type="flag-checkered" shadow/>
        </DraggableMarker>
      );
    }
    return markers;
  }

  renderPopup () {
    const { popupCoordinates } = this.state;

    if (popupCoordinates) {
      return (
        <React.Fragment>
          <Marker
             coordinates={popupCoordinates}
             key={`${popupCoordinates.toString()}-temp-marker`}
             anchor="bottom"
             >
            <PinIcon size="2rem" type="flag-checkered" color="#ababab" shadow/>
          </Marker>
          <Popup
             coordinates={popupCoordinates}
             key={`${popupCoordinates.toString()}-popup`}
             offset={{
               bottom: [0, -32],
               top: [0, 0]
             }}
             >
            <MapPopup
               coordinates={popupCoordinates}
               onClose={this.onPopupClose}
               onRoute={this.setDestinationPosition}
               onSetUserPosition={this.setUserPosition}
               />
          </Popup>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  setUserPosition = (lngLat) => {
    this.setState({popupCoordinates: null});

    const user = Object.assign({}, this.props.user, {coordinates: lngLat});
    this.props.onUserChange && this.props.onUserChange(user);
  }

  setDestinationPosition = (lngLat) => {
    this.setState({popupCoordinates: null});

    this.props.onDestinationChange && this.props.onDestinationChange({
      address: {freeformAddress: `${lngLat.lng.toFixed(6)}, ${lngLat.lat.toFixed(6)}` },
      coordinates: lngLat
    });

    this.props.reverseGeocodeFn(lngLat)
      .then(address => {
        address.coordinates = lngLat; // We're only using the reverse geocode API to get the name of the nearest address. The route uses the coordinates chosen by the user.
        this.props.onDestinationReverseGeocode && this.props.onDestinationReverseGeocode(address);
      });
  }

  onMapRender = (map) => {
    this.map = map;
  }

  onMapClick = (map, event) => {
    if (this.state.popupCoordinates) {
      this.setState({popupCoordinates: null});
      return;
    }

    const features = map.queryRenderedFeatures(event.point, {layers: this.avoidLayers});
    if (features.length > 0) {
      return;
    }

    this.setState({popupCoordinates: event.lngLat});
  }

  onMoveEnd = (map) => {
    this.setState({geolocating: false});
    this.props.onMoveEnd && this.props.onMoveEnd(map.getCenter());
  }

  onGeolocate = () => {
    this.setState({geolocating: true});
    this.props.onGeolocate && this.props.onGeolocate();
  }

  onPopupClose = () => {
    this.setState({popupCoordinates: null});
  }

  onRouteClick = (event) => {
    const route = event.feature.properties.route;
    this.props.onActiveRouteChange && this.props.onActiveRouteChange(route);
  }

}

Map.propTypes = {
  user: PropTypes.object,
  destination: PropTypes.object,
  routes: PropTypes.object,
  chargingpark: PropTypes.object,
  activeRoute: PropTypes.string,
  reverseGeocodeFn: PropTypes.func.isRequired,
  onMoveEnd: PropTypes.func,
  onGeolocate: PropTypes.func,
  onDestinationChange: PropTypes.func,
  onDestinationReverseGeocode: PropTypes.func,
  onActiveRouteChange: PropTypes.func,
  onUserChange: PropTypes.func,
  onFitBounds: PropTypes.func
};

export default Map;
