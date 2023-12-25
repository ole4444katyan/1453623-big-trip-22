import {getRandomArrayElement, getRandomFromRange} from '../utils.js';
import {
  TYPES,
  CITIES,
  OFFERS,
  PRICE,
  DESCRIPTIONS,
} from '../const.js';


const mockPoints = [
  {
    date: new Date ('2023-01-01'),
    type: getRandomArrayElement(TYPES),
    place: getRandomArrayElement(CITIES),
    startTime: new Date ('2023-01-04 07:00'),
    endTime: new Date ('2023-01-04 07:10'),
    price: getRandomFromRange(PRICE.min, PRICE.max),
    offers: getRandomArrayElement(OFFERS),
    offersPrice:  getRandomFromRange(PRICE.min, PRICE.max),
    isFavorite: true,
    description: getRandomArrayElement(DESCRIPTIONS),
  },
  {
    date: new Date ('2023-01-02'),
    type: getRandomArrayElement(TYPES),
    place: getRandomArrayElement(CITIES),
    startTime: new Date ('2023-01-04 07:00'),
    endTime: new Date ('2023-01-05 07:30'),
    price: getRandomFromRange(PRICE.min, PRICE.max),
    offers: getRandomArrayElement(OFFERS),
    offersPrice:  getRandomFromRange(PRICE.min, PRICE.max),
    isFavorite: true,
    description: getRandomArrayElement(DESCRIPTIONS),
  },
  {
    date: new Date ('2023-01-03'),
    type: getRandomArrayElement(TYPES),
    place: getRandomArrayElement(CITIES),
    startTime: new Date ('2023-01-04 07:00'),
    endTime: new Date ('2023-01-04 08:30'),
    price: getRandomFromRange(PRICE.min, PRICE.max),
    offers: getRandomArrayElement(OFFERS),
    offersPrice:  getRandomFromRange(PRICE.min, PRICE.max),
    isFavorite: true,
    description: getRandomArrayElement(DESCRIPTIONS),

  },
  {
    date: new Date ('2023-01-04'),
    type: getRandomArrayElement(TYPES),
    place: getRandomArrayElement(CITIES),
    startTime: new Date ('2023-01-04 07:00'),
    endTime: new Date ('2023-01-04 07:30'),
    price: getRandomFromRange(PRICE.min, PRICE.max),
    offers: getRandomArrayElement(OFFERS),
    offersPrice:  getRandomFromRange(PRICE.min, PRICE.max),
    isFavorite: true,
    description: getRandomArrayElement(DESCRIPTIONS),
  },
];

function getRandomPoint () {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
