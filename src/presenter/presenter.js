// views
import InfoView from '../view/info-view.js';
import FilterView from '../view/filter-view.js';
import NoPointMessageView from '../view/no-point-message-view.js';

import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/sort-view.js';

// utils
import {render} from '../framework/render.js';
import {updateItem} from '../utils.js';

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

  #pointPresenters = new Map();

  constructor({pointsContainer, pointsModel, destinationsModel, offersModel}) {
    this.#pointsContainer = pointsContainer;
    this.#points = pointsModel.allPoints;
    this.#destinationModel = destinationsModel;
    // this.destinations = destinationsModel.get();
    this.#offers = offersModel;
  }

  init() {
    this.#renderPointBoard();
  }

  #handlePointsChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
    // console.log('init');
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPointBoard() {
    this.#renderFilters();
    this.#renderInfo();
    this.#renderSort();
    this.#renderPointsContainer();
    this.#renderNoPoints();
    this.#renderPoints();
  }

  #renderInfo() {
    render(new InfoView(), siteInfoElement, 'afterbegin');
  }

  #renderFilters() {
    const filters = filteredPoints();
    render(new FilterView(this.#points, filters), siteFiltersElement);

  }

  #renderPointsContainer() {
    render(this.#pointListComponent, this.#pointsContainer);
  }

  #renderSort() {
    render(new SortView(), this.#pointsContainer);
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointsContainer,
      destinationModel: this.#destinationModel,
      offers: this.#offers,
      onDataChange: this.#handlePointsChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints () {
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints () {
    if (this.#points.length === 0) {
      render(this.#noPointComponent, this.#pointsContainer, 'afterbegin');
    }
  }
}
