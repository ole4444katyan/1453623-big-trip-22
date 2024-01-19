// views
import InfoView from '../view/info-view.js';
import FilterView from '../view/list-filter-view.js';

import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/list-sort-view.js';

// utils
import {render} from '../framework/render.js';

// mocks
import {filteredPoints} from '../mock/filter-mock.js';

import PointPresenter from './task-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-main__trip-controls');
const siteInfoElement = siteHeaderElement.querySelector('.trip-main');

export default class Presenter {
  #pointListComponent = new ListPointsView();

  #pointsContainer = null;
  #points = null;
  #destinationModel = null;
  #offers = null;

  constructor({pointsContainer, pointsModel, destinationsModel, offersModel}) {
    this.#pointsContainer = pointsContainer;
    this.#points = pointsModel.allPoints;
    this.#destinationModel = destinationsModel;
    // this.destinations = destinationsModel.get();
    this.#offers = offersModel;
  }

  init() {

    const filters = filteredPoints();

    render(new FilterView(this.#points, filters), siteFiltersElement);
    render(new InfoView(), siteInfoElement, 'afterbegin');

    render(new SortView, this.#pointsContainer);
    render(this.#pointListComponent, this.#pointsContainer);


    this.#renderPoint();

    this.#points.forEach((point) => {
      this.#renderPoint({
        point: point,
        pointDestinations: this.#destinationModel.getById(point.destination),
        pointOffers: this.#offers.getByType(point.type)
      });
    });
  }

  #renderPoint () {
    const pointPresenter = new PointPresenter({
      pointListComponent: this.#pointListComponent,
      points: this.#points,
      destinationModel: this.#destinationModel,
      offers: this.#offers,
    });


    this.#points.forEach((point) => pointPresenter.init(point));
  }
}
