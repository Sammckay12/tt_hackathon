import model3Image from '../images/model3.png';
import modelSImage from '../images/models.png';
import i3Image from '../images/i3.png';
import leafImage from '../images/leaf.png';

const vehicles = [
  {
    make: 'Tesla',
    model: 'Model 3',
    image: model3Image,
    connectorType: 'Tesla Connector',
    consumptionModel: {
      vehicleEngineType: 'electric',
      constantSpeedConsumptionInkWhPerHundredkm: '100,14.73',
      vehicleWeight: 1611,
      currentChargeInkWh: 50,
      maxChargeInkWh: 50,
      auxiliaryPowerInkW: 1.7,
      accelerationEfficiency: 0.66,
      decelerationEfficiency: 0.91,
      uphillEfficiency: 0.74,
      downhillEfficiency: 0.73
    },
    coordinates: null
  },
  {
    make: 'Tesla',
    model: 'Model S 100D',
    image: modelSImage,
    connectorType: 'Tesla Connector',
    consumptionModel: {
      vehicleEngineType: 'electric',
      constantSpeedConsumptionInkWhPerHundredkm: '100,20.09',
      vehicleWeight: 2200,
      currentChargeInkWh: 100,
      maxChargeInkWh: 100,
      auxiliaryPowerInkW: 1.7,
      accelerationEfficiency: 0.66,
      decelerationEfficiency: 0.91,
      uphillEfficiency: 0.74,
      downhillEfficiency: 0.73
    },
    coordinates: null
  },
  {
    make: 'BMW',
    model: 'i3',
    image: i3Image,
    connectorType: 'IEC 62196 Type 2 Outlet',
    consumptionModel: {
      vehicleEngineType: 'electric',
      constantSpeedConsumptionInkWhPerHundredkm: '80,14.8:100,18.5:120,22.7',
      vehicleWeight: 1195,
      currentChargeInkWh: 33,
      maxChargeInkWh: 33,
      auxiliaryPowerInkW: 1.7,
      accelerationEfficiency: 0.66,
      decelerationEfficiency: 0.91,
      uphillEfficiency: 0.74,
      downhillEfficiency: 0.73
    },
    coordinates: null
  },
  {
    make: 'Nissan',
    model: 'Leaf',
    image: leafImage,
    connectorType: 'SAE J1772',
    consumptionModel: {
      vehicleEngineType: 'electric',
      constantSpeedConsumptionInkWhPerHundredkm: '100,18.7',
      vehicleWeight: 2020,
      currentChargeInkWh: 40,
      maxChargeInkWh: 40,
      auxiliaryPowerInkW: 1.7,
      accelerationEfficiency: 0.66,
      decelerationEfficiency: 0.91,
      uphillEfficiency: 0.74,
      downhillEfficiency: 0.73
    },
    coordinates: null
  }
];

export default vehicles;
