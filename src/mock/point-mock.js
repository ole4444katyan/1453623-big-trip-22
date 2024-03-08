import {getRandomFromRange, createUniqueId} from '../utils.js';
import {
  PRICE,
  POINT_COUNT,
} from '../const.js';
import {getDate} from './date-mock.js';

const pointId = createUniqueId(1, POINT_COUNT);

function generatePointMock (type, destinationId, offerIds) {
  return {
    id: pointId(),
    basePrice: getRandomFromRange(PRICE.min, PRICE.max),
    dateFrom: getDate({dateTo: false}),
    dateTo: getDate({dateTo: true}),
    destination: destinationId,
    isFavorite: Boolean(getRandomFromRange(0, 1)),
    offers: offerIds,
    type,
  };
}

export {generatePointMock};
