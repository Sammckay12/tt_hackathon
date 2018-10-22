import mapboxgl from 'mapbox-gl';
import {TOMTOM_API_KEY, ONLINE_SEARCH_BASE_URL} from '../config';

const search = (query, bias) => {
  let url = `${ONLINE_SEARCH_BASE_URL}/search/${encodeURIComponent(query)}.json?key=${TOMTOM_API_KEY}&typeahead=true&limit=5`;

  if (bias) {
    url = `${url}&lat=${bias.lat}&lon=${bias.lng}`;
  }

  return fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(new Error('Failed to search.'));
      }
    })
    .then(json => {
      if (json.results) {
        return json.results.map(result => {
          const { lon, lat } = result.position;
          result.coordinates = new mapboxgl.LngLat(lon, lat);
          return result;
        });
      } else {
        return [];
      }
    });
}

const reverseGeocode = (lngLat) => {
  const url = `${ONLINE_SEARCH_BASE_URL}/reverseGeocode/${lngLat.lat},${lngLat.lng}.json?key=${TOMTOM_API_KEY}`;

  return fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(new Error('Failed to reverse geocode point.'));
      }
    })
    .then(json => {
      if (json.addresses && json.addresses.length > 0) {
        const address = json.addresses[0];
        const [ lat, lng ] = address.position.split(',');
        return Object.assign({}, address, {coordinates: new mapboxgl.LngLat(lng, lat)});
      } else {
        return {coordinates: lngLat}
      }
    });
}

export default { search, reverseGeocode }
