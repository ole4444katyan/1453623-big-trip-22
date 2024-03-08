export default class OffersModel {
  #offers = null;
  #binder = null;

  constructor (binder) {
    this.#binder = binder;
    this.#offers = this.#binder.getOffers();
  }

  get() {
    return this.#offers;
  }

  getByType (type) {
    return this.#offers.find((offer) => offer.type.toLowerCase() === type.toLowerCase()).offers
    || null;
  }
}
