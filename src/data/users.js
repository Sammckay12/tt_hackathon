import emmaImage from '../images/emma.png';
import henryImage from '../images/henry.png';
import victoriaImage from '../images/victoria.png';
import philipImage from '../images/philip.png';

const users = [
  {
    make: 'Emma',
    model: '',
    image: emmaImage,
    connectorType: 'Tesla Connector',
    consumptionModel: {
      userEngineType: 'electric',
      constantSpeedConsumptionInkWhPerHundredkm: '100,14.73',
      userWeight: '18:00',
      currentChargeInkWh: 'Monday',
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
    make: 'Henry',
    model: '',
    image: henryImage,
    connectorType: 'Tesla Connector',
    consumptionModel: {
      userEngineType: 'electric',
      constantSpeedConsumptionInkWhPerHundredkm: '100,20.09',
      userWeight: '18:00',
      currentChargeInkWh: 'Monday',
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
    make: 'Victoria',
    model: '',
    image: victoriaImage,
    connectorType: 'IEC 62196 Type 2 Outlet',
    consumptionModel: {
      userEngineType: 'electric',
      constantSpeedConsumptionInkWhPerHundredkm: '80,14.8:100,18.5:120,22.7',
      userWeight: '18:00',
      currentChargeInkWh: 'Monday',
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
    make: 'Philip',
    model: '',
    image: philipImage,
    connectorType: 'SAE J1772',
    consumptionModel: {
      userEngineType: 'electric',
      constantSpeedConsumptionInkWhPerHundredkm: '100,18.7',
      userWeight: '18:00',
      currentChargeInkWh: 'Monday',
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

export default users;
