import mapboxgl from 'mapbox-gl';

import emmaImage from '../images/emma.png';
import henryImage from '../images/henry.png';
import victoriaImage from '../images/victoria.png';
import philipImage from '../images/philip.png';

const users = [
  {
    name: 'Emma',
    userId: 'abc',
    image: emmaImage,
    coordinates: {lng: 20.4327543, lat: 44.805575}
  },
  {
    name: 'Henry',
    userId: 'def',
    image: henryImage,
    coordinates: {lng: 10.4327543, lat: 44.805575}
  },
  {
    name: 'Victoria',
    userId: 'ghi',
    image: victoriaImage,
    coordinates: {lng: 20.4327543, lat: 34.805575}
  },
  {
    name: 'Philip',
    userId: 'jkl',
    image: philipImage,
    coordinates: {lng: 10.4327543, lat: 34.805575}
  }
];

export default users;
