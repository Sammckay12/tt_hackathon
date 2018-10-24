import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaIcon } from 'legoland-ui';
import moment from 'moment';

import './PlaceTile.css';

class PlaceTile extends Component {

  render() {
    const { marginTop, place, delay } = this.props;
    return (
      <button
        style={marginTop}
        className="PlaceTile">

        <FaIcon className="PlaceTile-icon" type="restaurant"/>

        <div className="PlaceTile-details">
          <label className="PlaceTile-title">{place.name}</label>
          <div className="PlaceTile-info">
            <label className="PlaceTile-text">{place.category}</label>
            <label className="PlaceTile-text">ETA +{delay}mins</label>
            <div style={{height: '5px', width: '15%', backgroundColor: this.props.strokeColor}}></div>
          </div>
        </div>
      </button>
    );
  }
}

export default PlaceTile;
