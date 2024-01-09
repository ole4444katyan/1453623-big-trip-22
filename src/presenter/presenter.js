// views
import InfoView from '../view/info-view.js';
import FilterView from '../view/list-filter-view.js';

import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/list-sort-view.js';
import PointView from '../view/point-view.js';
import EditingPointView from '../view/editing-point-view.js';

// utils
import {render} from '../framework/render.js';
import {getRandomArrayElement} from '../utils.js';


const siteHeaderElement = document.querySelector('.page-header');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-main__trip-controls');
const siteInfoElement = siteHeaderElement.querySelector('.trip-main');

export default class Presenter {
  pointListComponent = new ListPointsView();

  constructor({pointsContainer, pointsModel, destinationsModel, offersModel}) {
    this.pointsContainer = pointsContainer;
    this.points = pointsModel.get();
    this.destinationModel = destinationsModel;
    // this.destinations = destinationsModel.get();
    this.offers = offersModel;
  }

  init() {

    render(new FilterView(), siteFiltersElement);
    render(new InfoView(), siteInfoElement, 'afterbegin');

    render(new SortView, this.pointsContainer);
    render(this.pointListComponent, this.pointsContainer);

    const randomEditingPoint = getRandomArrayElement(this.points);


    render(new EditingPointView({
      point: randomEditingPoint,
      pointDestinations: this.destinationModel.getById(randomEditingPoint.destination),
      pointOffers: this.offers.getByType(randomEditingPoint.type)
    }), this.pointListComponent.element, 'afterbegin');

    for (let i = 0; i < this.points.length; i++) {
      render(new PointView({
        point: this.points[i],
        pointDestinations: this.destinationModel.getById(this.points[i].destination),
        pointOffers: this.offers.getByType(this.points[i].type)
      }), this.pointListComponent.element);
    }
  }
}
