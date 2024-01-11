import {OFFER_COUNT, OFFERS, PRICE, POINT_COUNT} from '../const.js';
import {createUniqueId, getRandomArrayElement, getRandomFromRange} from '../utils.js';

const OFFERS_COUNT = POINT_COUNT * OFFER_COUNT;

const offerId = createUniqueId(1, OFFERS_COUNT);

function generateOfferMock() {
  return {
    id: offerId(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomFromRange(PRICE.min, PRICE.max),
  };
}

export {generateOfferMock};
