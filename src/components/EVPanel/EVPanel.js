import _ from 'lodash';
import fetch from 'cross-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Preloader, FaIcon } from 'legoland-ui';
import BackIcon from '../BackIcon/BackIcon';
import formatAddress from '../../util/formatAddress';
import formatOpeningHours from '../../util/formatOpeningHours';

import './EVPanel.css';

class EVPanel extends Component {

  state = {
    loading: false,
    chargingPoints: null
  }

  componentDidMount () {
    const { chargingpark } = this.props;
    
    if (chargingpark) {
      this.setState({loading: true}, () => this.loadChildData(chargingpark));
    }
  }

  componentWillReceiveProps (nextProps) {
    const { chargingpark: nextChargingPark } = nextProps;
    const { chargingpark: prevChargingPark } = this.props;

    if (nextChargingPark) {
      if (!_.isEqual(nextChargingPark, prevChargingPark)) {
        this.setState({loading: true, chargingPoints: null}, () => this.loadChildData(nextChargingPark));
      }
    }
  }

  loadChildData (chargingpark) {
    const { id } = chargingpark;
    const url = `${this.props.baseUrl}/chargingpark/${id}?populate=true`;

    fetch(url)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(new Error(`Failed to fetch child data for charging park ${id}`));
      })
      .then(json => {
        const points = json.properties.charging_stations.reduce((points, station) => points.concat(station.charging_points), []);
        const chargingPoints = {};

        points.forEach(point => {
          if (point) {
            point.plug_type.forEach(type => {

              let stats = chargingPoints[type];
              if (!stats) {
                stats = {total: 0, available: 0, occupied: 0, unknown: 0};
                chargingPoints[type] = stats;
              }
              stats.total = stats.total + 1;
              if (point.status === 'Available') {
                stats.available = stats.available + 1;
              } else if (point.status === 'Occupied') {
                stats.occupied = stats.occupied + 1;
              } else {
                stats.unknown = stats.unknown + 1;
              }
            });
          }
        });          
        this.setState({loading: false, chargingPoints});
      })
      .catch(() => {
        this.setState({loading: false});
      });
  }
  
  render () {
    const { loading, chargingPoints } = this.state;
    const { chargingpark, onBack } = this.props;

    if (!chargingpark) {
      return null;
    }
    
    const { properties } = chargingpark;
    const operator = JSON.parse(properties.operator);
    const address = JSON.parse(properties.address);
    const contact = JSON.parse(properties.contact);
    const openingHours = JSON.parse(properties.opening_hours);
    
    return (
      <div className="EVPanel">
        <div className="EVPanel-header">
          <button
             className="EVPanel-back-button"
             onClick={onBack}
             >
            <BackIcon/>
          </button>
          <div className="EVPanel-title truncate">{properties.name}</div>
        </div>
        <section className="EVPanel-contact-info mb-30">
          <div className="EVPanel-info-line">
            <FaIcon type="building"/>
            <span className="truncate">{operator.name}</span>
          </div>
          <div className="EVPanel-info-line">
            <FaIcon type="map-marker"/>
            <span className="truncate">{formatAddress(address)}</span>
          </div>
          {contact && contact.phone &&
            <div className="EVPanel-info-line">
              <FaIcon type="phone"/>
              <span className="truncate">{contact.phone}</span>
            </div>
          }
          {openingHours &&
            <div className="EVPanel-info-line">
              <FaIcon type="clock-o"/>
              <span dangerouslySetInnerHTML={{__html: formatOpeningHours(openingHours)}}/>
            </div>
          }
        </section>
        <div className="EVPanel-charging-points">
          <h1>Charging Points</h1>
          <div className="EVPanel-charging-points-container">
            {loading ? (
              <Preloader/>
            ) : (
              chargingPoints ? (this.renderChargingPoints()) : (
                <div className="EVPanel-status flex-horizontal">
                  <FaIcon type="exclamation-circle" size={2}/>
                  <div className="EVPanel-error-message">Failed to load charging points</div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="EVPanel-button-bar flex-horizontal flex-center">
          <button className="button-ev button-ev-ghost" onClick={this.onRoute}><span>Route to here</span></button>
        </div>
      </div>
    );
  }

  renderChargingPoints () {
    const { chargingPoints } = this.state;
    const items = [];

    for (let type in chargingPoints) {
      const stats = chargingPoints[type];
      items.push(
        <div key={type} className="EVPanel-charging-point">
          <div className="EVPanel-charging-point-text">
            <div>{type.split('_').join(' ')}</div>
            <div className="EVPanel-charging-point-stats">{stats.total} point{stats.total > 1 ? 's' : ''}{(stats.available || stats.occupied) ? `, ${stats.available} available` : ''}</div>
          </div>
          <div className={`EVPanel-charging-point-status-indicator ${stats.available > 0 ? 'available' : (stats.occupied === stats.total ? 'occupied' : 'unknown')}`}></div>
        </div>
      );
    }

    return items;
  }

  onRoute = () => {
    const { chargingpark } = this.props;
    const { geometry: { coordinates }, properties: { address } } = chargingpark;

    this.props.onRoute({
      coordinates: coordinates,
      address: {
        freeformAddress: formatAddress(JSON.parse(address))
      }
    });
  }
}

EVPanel.propTypes = {
  chargingpark: PropTypes.object,
  baseUrl: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  onRoute: PropTypes.func.isRequired
};

EVPanel.defaultProps = {
  baseUrl: '//ev.apac.tomtom.com'
};

export default EVPanel;
