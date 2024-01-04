export default class OffersModel {
  constructor (binder) {
    this.binder = binder;
    this.offers = this.binder.getOffers();
  }

  get () {
    return this.offers;
  }

  getByType (type) {
    return this.offers.find((offer) => offer.type === type).offers
    || null;
  }
}
