export default class PointsModel {
  constructor (binder) {
    this.binder = binder;
    this.points = this.binder.getPoints();
  }

  get () {
    return this.points;
  }
}
