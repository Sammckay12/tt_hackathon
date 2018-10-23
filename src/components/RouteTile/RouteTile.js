import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaIcon } from 'legoland-ui';
import moment from 'moment';

import './RouteTile.css';

class RouteTile extends Component {

  // routeLabel='Home' routeEta='6:30pm' routeDelay='5'
  calculateDelay = () => {
    return this.props.routes.normal.summary.trafficDelayInSeconds / 60;
  }

  calculateEta = () => {
    return moment(this.props.routes.normal.summary.arrivalTime).format('hh:mmA');
  }


  render() {
    return (
      <button style={this.props.marginTop} className="RouteTile">
        <FaIcon className="RouteTile-icon" type="home"/>

        <div className="RouteTile-details">
          <label className="RouteTile-title">{Object.keys(this.props.routes)[0]}</label>
          <div className="RouteTile-info">
            <label className="RouteTile-text">{this.calculateEta()}</label>
            <label className="RouteTile-text">{this.calculateDelay()}min delay</label>
            <div style={{height: '5px', width: '15%', backgroundColor: 'red'}}></div>
          </div>
        </div>
      </button>
    );
  }
}

export default RouteTile;
