import fetch from 'cross-fetch';
import mapboxgl from 'mapbox-gl';
import cache from 'js-cache';
import _ from 'lodash';
import objectToQueryString from '../util/objectToQueryString';
import {TOMTOM_API_KEY, ONLINE_ROUTING_BASE_URL} from '../config';

const reachableRange = (user, routeType = 'fastest', useTraffic = true) => {
  const { coordinates } = user;
  const consumptionModelParams = objectToQueryString(user.consumptionModel);
  const points = `${coordinates.lat},${coordinates.lng}`;
  const url = `${ONLINE_ROUTING_BASE_URL}/calculateReachableRange/${points}/json?routeType=${routeType}&traffic=${useTraffic}&${consumptionModelParams}&energyBudgetInkWh=${user.consumptionModel.currentChargeInkWh}&key=${TOMTOM_API_KEY}`;

  const boundary = cache.get(url);

  if (boundary) {
    return Promise.resolve(boundary);
  } else {
    return fetch(url)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(new Error('Failed to calculate reachable range'));
      })
      .then(json => {
        const { reachableRange } = json;
        const coordinates = reachableRange.boundary.map(p => [p.longitude, p.latitude]);
        const boundary = [coordinates];

        cache.set(url, boundary, 300000);

        return boundary;
      });
  }
};

const batchRoute = (user, destination, useTraffic = true) => {
  const batchItems = [];
  const points = [mapboxgl.LngLat.convert(user.coordinates), mapboxgl.LngLat.convert(destination.coordinates)].map(p => `${p.lat},${p.lng}`).join(':');
  const consumptionModelParams = objectToQueryString(user.consumptionModel);

  batchItems.push({
    query: `/calculateRoute/${points}/json?routeType=fastest&traffic=${useTraffic}&${consumptionModelParams}`
  });
  batchItems.push({
    query: `/calculateRoute/${points}/json?routeType=eco&traffic=${useTraffic}&${consumptionModelParams}`
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
      const eco = processRoute(batchItems[1].response.routes[0]);
      eco.summary.energySavingInkWh = normal.summary.batteryConsumptionInkWh - eco.summary.batteryConsumptionInkWh;
      return { normal, eco };
    });
};

const processRoute = (route) => {
  const summary = route.summary;
  summary.batteryConsumptionInkWh = +(summary.batteryConsumptionInkWh.toFixed(1));

  const segments = route.legs.map(leg => {
    return leg.points.map(p => [p.longitude, p.latitude]);
  });
  const coordinates = _.flatten(segments);
  const bounds = coordinates.reduce((bounds, coord) => bounds.extend(coord), new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])).toArray();
  return {summary, coordinates, bounds};
};

export default {
  reachableRange,
  batchRoute
};
