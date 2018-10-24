import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaIcon } from 'legoland-ui';
import moment from 'moment';

import './PlaceTile.css';

class PlaceTile extends Component {

  render() {
    return (
      <button
        style={this.props.marginTop}
        className="PlaceTile">

        <FaIcon className="PlaceTile-icon" type="restaurant"/>

        <div className="PlaceTile-details">
          <label className="PlaceTile-title">Shop Name</label>
          <div className="PlaceTile-info">
            <label className="PlaceTile-text">Coffee Shop</label>
            <label className="PlaceTile-text">ETA + 5mins</label>
            <div style={{height: '5px', width: '15%', backgroundColor: this.props.strokeColor}}></div>
          </div>
        </div>
      </button>
    );
  }
}

export default PlaceTile;
