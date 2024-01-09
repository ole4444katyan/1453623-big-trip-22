export default class DestinationsModel {
  #destinations = null;
  #binder = null;

  constructor (binder) {
    this.#binder = binder;
    this.#destinations = this.#binder.getDestinations();
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id)
    || null;
  }
}
