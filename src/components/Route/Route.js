import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Feature } from 'react-mapbox-gl';

class Route extends Component {

  render () {
    const {
      id,
      before,
      coordinates,
      color,
      width,
      strokeColor,
      strokeWidth,
      properties,
      onClick
    } = this.props;

    const lineLayout = {
      'line-cap': 'round',
      'line-join': 'round'
    };

    const linePaint = {
      'line-color': color,
      'line-width': width
    };

    const strokePaint = {
      'line-color': strokeColor,
      'line-width': strokeWidth
    };

    return (
      <React.Fragment>
        <Layer
           id={`${id}-stroke`}
           before={before}
           key="route-stroke"
           type="line"
           layout={lineLayout} paint={strokePaint}
           >
          <Feature
             coordinates={coordinates}
             properties={properties}
             onMouseEnter={this.onMouseEnter}
             onMouseLeave={this.onMouseLeave}
             onClick={onClick}
             />
        </Layer>
        <Layer
           id={id}
           before={before}
           key="route-fill"
           type="line"
           layout={lineLayout}
           paint={linePaint}
           >
          <Feature
             coordinates={coordinates}
             properties={properties}
             onMouseEnter={this.onMouseEnter}
             onMouseLeave={this.onMouseLeave}
             onClick={onClick}
             />
        </Layer>
      </React.Fragment>
    );
  }

  onMouseEnter (event) {
    event.target.getCanvas().style.cursor = 'pointer';
  }

  onMouseLeave (event) {
    event.target.getCanvas().style.cursor = '';
  }
}

Route.propTypes = {
  id: PropTypes.string.isRequired,
  before: PropTypes.string,
  coordinates: PropTypes.array.isRequired,
  color: PropTypes.string,
  width: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  properties: PropTypes.object,
  onClick: PropTypes.func
};

Route.defaultProps = {
  color: '#2a9aeb',
  width: 6,
  strokeColor: '#9a9a9a',
  strokeWidth: 9
};

export default Route;
