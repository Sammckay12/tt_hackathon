import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './GeolocateControl.css';

class GeolocateControl extends Component {

  constructor (props) {
    super(props);
    this.createContainer();
  }

  createContainer () {
    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl';
  }

  componentDidMount () {
    if (this.context.map) {
      this.addControlToMap();
    }
  }

  componentWillUnmount () {
    const { map } = this.context;
    if (map) {
      map.removeControl(this);
    }
  }

  addControlToMap () {
    const { map } = this.context;
    const { position } = this.props;
    map.addControl(this, position);
  }

  onAdd () {
    return this.container;
  }

  onRemove () {
    this.container.parentNode.removeChild(this.container);
  }

  render () {
    const { active, onClick } = this.props;
    const classes = classnames(
      'GeolocateControl',
      !active || 'active'
    );

    return ReactDOM.createPortal(
      (
        <div className={classes}>
          <button onClick={onClick}>
            <span className="GeolocateControl-icon fa fa-location-arrow"/>
          </button>
      </div>
      ), this.container
    );
  }
}

GeolocateControl.propTypes = {
  position: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func
};

GeolocateControl.defaultProps = {
  position: 'top-right'
};

GeolocateControl.contextTypes = {
  map: PropTypes.object
};

export default GeolocateControl;
