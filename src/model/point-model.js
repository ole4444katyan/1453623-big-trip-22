import {getRandomPoint} from '../mock/point-mock.js';

const POINT_COUNT = 5;

export default class PointModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoints () {
    return this.points;
  }
}
