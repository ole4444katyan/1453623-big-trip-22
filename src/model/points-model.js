export default class PointsModel {
  #points = null;
  #binder = null;

  constructor (binder) {
    this.#binder = binder;
    this.#points = this.#binder.getPoints();
  }

  get allPoints() {
    return this.#points;
  }
}
