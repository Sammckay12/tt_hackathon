import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import * as MapboxGl from 'mapbox-gl';

export default class DraggableMarker extends React.Component {

  marker = null;

  componentDidMount () {
    const { map } = this.context;

    const {
      coordinates,
      anchor,
      offset,
      draggable
    } = this.props;

    const wrapper = document.createElement('div');
    ReactDOM.render(this.props.children, wrapper);

    this.marker = new MapboxGl.Marker({
      element: wrapper,
      anchor,
      offset,
      draggable
    })
      .setLngLat(coordinates)
      .addTo(map);

    this.marker.on('dragstart', this.onDragStart);
    this.marker.on('drag', this.onDrag);
    this.marker.on('dragend', this.onDragEnd);
  }

  componentWillUnmount () {
    this.marker.remove();
  }

  componentDidUpdate () {
    const {
      coordinates,
      offset,
      draggable
    } = this.props;

    this.marker.setLngLat(coordinates);
    this.marker.setOffset(offset);
    this.marker.setDraggable(draggable);
  }

  render () {
    return null;
  }

  onDragStart = () => {
    const lngLat = this.marker.getLngLat();
    this.props.onDragStart && this.props.onDragStart(lngLat);
  }

  onDrag = () => {
    const lngLat = this.marker.getLngLat();
    this.props.onDrag && this.props.onDrag(lngLat);
  }

  onDragEnd = () => {
    const lngLat = this.marker.getLngLat();
    this.props.onDragEnd && this.props.onDragEnd(lngLat);
  }
}

DraggableMarker.contextTypes = {
  map: PropTypes.object
};

DraggableMarker.propTypes = {
  coordinates: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  anchor: PropTypes.string,
  offset: PropTypes.array,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func
};

DraggableMarker.defaultProps = {
  anchor: 'center',
  offset: [0, 0]
};
