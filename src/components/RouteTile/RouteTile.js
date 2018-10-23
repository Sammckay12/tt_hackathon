import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaIcon } from 'legoland-ui';

import './RouteTile.css';

class RouteTile extends Component {

  render() {
    const { routeLabel, routeEta, routeDelay } = this.props;

    return (
      <button className="RouteTile">
        <FaIcon className="RouteTile-icon" type="home"/>

        <div className="RouteTile-details">
          <label className="RouteTile-title">{routeLabel}</label>
          <div className="RouteTile-info">
            <label className="RouteTile-text">{routeEta}</label>
            <label className="RouteTile-text">{routeDelay}min delay</label>
            <div style={{height: '5px', width: '15%', backgroundColor: 'red'}}></div>
          </div>
        </div>
      </button>
    );
  }
}

export default RouteTile;
