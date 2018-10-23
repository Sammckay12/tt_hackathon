import fetch from 'cross-fetch';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash';
import {TOMTOM_API_KEY, ONLINE_ROUTING_BASE_URL} from '../config';

const batchRoute = (user, destination, useTraffic = true) => {
  const batchItems = [];
  const points = [mapboxgl.LngLat.convert(user.coordinates), mapboxgl.LngLat.convert(destination.coordinates)].map(p => `${p.lat},${p.lng}`).join(':');

  batchItems.push({
    query: `/calculateRoute/${points}/json?routeType=fastest&traffic=${useTraffic}`
  });
  batchItems.push({
    query: `/calculateRoute/${points}/json?routeType=eco&traffic=${useTraffic}`
  });

  const url = `${ONLINE_ROUTING_BASE_URL}/batch/sync/json?key=${TOMTOM_API_KEY}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({batchItems: batchItems}),
    mode: 'cors'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(new Error('Failed to calculate route'));
    })
    .then(json => {
      const { summary, batchItems } = json;

      if (summary.successfulRequests < summary.totalRequests) {
        return Promise.reject(new Error('A route could not be calculated between these locations'));
      }

      const normal = processRoute(batchItems[0].response.routes[0]);
      return { normal };
    });
};

const processRoute = (route) => {
  const summary = route.summary;

  const segments = route.legs.map(leg => {
    return leg.points.map(p => [p.longitude, p.latitude]);
  });
  const coordinates = _.flatten(segments);
  const bounds = coordinates.reduce((bounds, coord) => bounds.extend(coord), new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])).toArray();
  return {summary, coordinates, bounds};
};

export default {
  batchRoute
};
