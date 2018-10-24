import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import * as MapboxGl from 'mapbox-gl';

export default class DraggableMarker extends React.Component {

  marker = null;

  componentDidMount () {
    const { map } = this.context;

    const {
      coordinates,
      anchor,
      offset,
      draggable,
      size, 
      src,
      shadow
    } = this.props;

    const classes = classnames(
      'Icon',
      !shadow || 'shadow'
    );
    const style = {
      width: size,
      height: size,
      backgroundImage: `url(${src})`
    };
    
    const wrapper = document.createElement('div');
    wrapper.setAttribute("id", "icon-wrapper");
    ReactDOM.render(<div className={classes} style={style}></div>, wrapper);

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
      draggable,
      size, 
      src,
      shadow
    } = this.props;

    const classes = classnames(
      'Icon',
      !shadow || 'shadow'
    );
    const style = {
      width: size,
      height: size,
      backgroundImage: `url(${src})`
    };

    const wrapper = document.getElementById('icon-wrapper');
    ReactDOM.render(<div className={classes} style={style}></div>, wrapper);

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
