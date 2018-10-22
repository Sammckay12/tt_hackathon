import React from 'react';

import './Help.css';

const Help = () => {
  return (
    <div className="Help">
      <h2>How to use</h2>
      <section className="Help-usage">
        <p>
          Plan an energy-efficient route for an EV with confidence using this TomTom demo, which provides information on vehicle driving range, and charging station location and availability.
        </p>
        <h3>Reachable Range</h3>
        <p>
          Reachable range, how far the vehicle can drive on its current battery level, is displayed as a shaded region on the map.
        </p>
        <ul>
          <li>
            Click on the layers button to show the layers menu.
          </li>
          <li>
            Turn on <b>Show range</b>.
          </li>
        </ul>
        <h3>Routing</h3>
        <p>
          The EV Assistant shows you how much energy is needed to drive to a destination. An alternative energy-efficient route is also calculated using TomTom's Eco Routing.
        </p>
        <ul>
          <li>
            Find a destination by using the search box or by clicking on the map and choosing <b>Route to here</b> from the map popup. Statistics for the normal route are shown in the vehicle panel and the normal and eco routes are shown on the map.
          </li>
          <li>
            To view statistics for the eco route click the <b>ECO</b> tab in the vehicle panel.
          </li>
          <li>
            If the vehicle needs to recharge to reach the destination the route is displayed in red and a warning message is shown.
          </li>
        </ul>
        <h3>Charging Stations</h3>
        <p>
          EV charging stations are shown on the map, in grey clusters when viewing at outer zoom levels. Charging stations with at least one charging point currently available use green icons, stations with no points available are red, and grey is used where the status of the station's points is unknown.
        </p>
        <ul>
          <li>
            Click on the layers button to show the layers menu.
          </li>
          <li>
            Turn on <b>Available only</b> to show charging stations with at least one available charging point.
          </li>
          <li>
            Turn on <b>Compatible plug only</b> to show charging stations that support the vehicle's plug type.
          </li>
          <li>
            Select <b>In range</b> to limit the display of charging stations to those within the vehicle's reachable range.
          </li>
          <li>
            Select <b>Along route</b> to limit the display of charging stations to those within 2km of the vehicle's current route.
          </li>
          <li>
            Click on a charging station icon to view the station's contact details, opening hours and charging point status.
          </li>
        </ul>
      </section>
      <h2>Controls</h2>
      <section className="Help-controls">
        <p>
          Use the <div className="Help-icon geolocate-icon"><span className="fa fa-location-arrow"/></div> button to center the map on your current location.
        </p>
        <p>
          Use the <div className="Help-icon layers-icon"><span className="layer-stack-icon"/></div> button to show the layers menu.
        </p>
        <p>
          Use the <div className="Help-icon country-icon"><span className="flag-icon flag-icon-us"/></div> button to switch to another country.
        </p>
      </section>
    </div>
  );
};

export default Help;
