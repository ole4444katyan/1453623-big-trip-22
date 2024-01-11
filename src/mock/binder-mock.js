import {generatePointMock} from './point-mock.js';
import {getRandomArrayElement, getRandomFromRange} from '../utils.js';
import {
  POINT_COUNT,
  DESTINATION_COUNT,
  OFFER_COUNT,
  TYPES,
} from '../const.js';

import {generateDestinationMock} from './destination-mock.js';
import {generateOfferMock} from './offers-mock.js';


export default class BinderMock {
  constructor () {
    this.offers = this.generateOffersMock();
    this.destinations = [...this.generateDestinationsMock()];
    this.points = this.generatePointsMock();
  }

  generateDestinationsMock() {
    return Array.from({length: DESTINATION_COUNT}, () =>
      generateDestinationMock());
  }

  generateOffersMock () {
    return TYPES.map((type) => ({
      type,
      offers: Array.from(
        { length: getRandomFromRange(1, OFFER_COUNT) },
        () => generateOfferMock()),
    }));
  }

  generatePointsMock() {
    return Array.from({length: POINT_COUNT}, () => {
      const type = getRandomArrayElement(TYPES);
      const destination = getRandomArrayElement(this.destinations);

      const offersByType = this.offers.find((offerByType) => offerByType.type === type);
      const offersIds = offersByType ? offersByType.offers.map((offer) => offer.id) : [];

      return generatePointMock(type, destination.id, offersIds);
    });
  }

  getPoints () {
    return this.points;
  }

  getOffers () {
    return this.offers;
  }

  getDestinations () {
    return this.destinations;
  }
}


