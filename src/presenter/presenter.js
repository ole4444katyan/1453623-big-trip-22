// views
import InfoView from '../view/info-view.js';
import FilterView from '../view/filter-view.js';
import NoPointMessageView from '../view/no-point-message-view.js';

import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/sort-view.js';

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
  #noPointComponent = new NoPointMessageView();

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
    render(new SortView(), this.#pointsContainer);

    this.#renderPointBoard();

    //this.#points.forEach((point) => {
    //  this.#renderPoint({
    //    point: point,
    //    pointDestinations: this.#destinationModel.getById(point.destination),
    //    pointOffers: this.#offers.getByType(point.type)
    //  });
    //});
  }

  #renderPointBoard () {
    render(this.#pointListComponent, this.#pointsContainer);

    const pointPresenter = new PointPresenter({
      points: this.#points,
      pointListComponent: this.#pointListComponent,
      destinationModel: this.#destinationModel,
      offers: this.#offers,
      pointsContainer: this.#pointsContainer,
    });

    pointPresenter.init();
  }
}
