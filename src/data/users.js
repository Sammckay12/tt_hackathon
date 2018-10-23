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
    coordinates: {lng: 4.9059247, lat: 52.3763683}
  },
  {
    name: 'Henry',
    userId: 'def',
    image: henryImage,
    coordinates: {lng: 20.4327543, lat: 44.805575}
  },
  {
    name: 'Victoria',
    userId: 'ghi',
    image: victoriaImage,
    coordinates: {lng: 13.4595288, lat: 52.4953612}
  },
  {
    name: 'Philip',
    userId: 'jkl',
    image: philipImage,
    coordinates: {lng: 19.4470436, lat: 51.7593518}
  }
];

export default users;
