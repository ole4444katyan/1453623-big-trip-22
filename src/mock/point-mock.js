/* eslint-disable camelcase */
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
    base_price: getRandomFromRange(PRICE.min, PRICE.max),
    date_from: getDate({dateTo: false}),
    date_to: getDate({dateTo: true}),
    destination: destinationId,
    is_favorite: Boolean(getRandomFromRange(0, 1)),
    offers: [
      offerIds
    ],
    type,
  };
}

export {generatePointMock};
