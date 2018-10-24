import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaIcon } from 'legoland-ui';
import moment from 'moment';

import './RouteTile.css';

class RouteTile extends Component {

  // routeLabel='Home' routeEta='6:30pm' routeDelay='5'
  calculateDelay = (routeLabel) => {
    if (routeLabel === 'home') {
      return this.props.routes['normal'].summary.trafficDelayInSeconds / 60;
    } else {
      return this.props.routes[routeLabel].summary.trafficDelayInSeconds / 60;
    }
  }

  calculateEta = (routeLabel) => {
    if (routeLabel === 'home') {
      return moment(this.props.routes['normal'].summary.arrivalTime).format('hh:mmA');
    } else {
      return moment(this.props.routes[routeLabel].summary.arrivalTime).format('hh:mmA');
    }
  }

  render() {
    const { routeLabel } = this.props;

    return (
      <button
        onClick={() => {this.props.removeRoutes(routeLabel)}}
        style={this.props.marginTop}
        className="RouteTile">

        <FaIcon className="RouteTile-icon" type="home"/>

        <div className="RouteTile-details">
          <label className="RouteTile-title">{routeLabel}</label>
          <div className="RouteTile-info">
            <label className="RouteTile-text">{this.calculateEta(routeLabel)}</label>
            <label className="RouteTile-text">{this.calculateDelay(routeLabel)}min delay</label>
            <div style={{height: '5px', width: '15%', backgroundColor: this.props.strokeColor}}></div>
          </div>
        </div>
      </button>
    );
  }
}

export default RouteTile;
