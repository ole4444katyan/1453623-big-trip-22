// views
import InfoView from '../view/info-view.js';
import FilterView from '../view/filter-view.js';
import NoPointMessageView from '../view/no-point-message-view.js';

import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/sort-view.js';

// utils
import {render} from '../framework/render.js';
import {
  updateItem,
  sortPointByTime,
  sortPointByPrice,
  sortPointByDay
} from '../utils.js';

import {SortTypes} from '../const.js';

// mocks
import {filteredPoints} from '../mock/filter-mock.js';

import PointPresenter from './point-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-main__trip-controls');
const siteInfoElement = siteHeaderElement.querySelector('.trip-main');

export default class Presenter {
  #pointListComponent = new ListPointsView();
  #noPointComponent = new NoPointMessageView();

  #sortComponent = null;
  #currentSortType = SortTypes.DAY;
  #sourcedPoints = [];

  #pointsContainer = null;
  #points = null;
  #destinationModel = null;
  #offersModel = null;

  #pointPresenters = new Map();

  constructor({pointsContainer, pointsModel, destinationsModel, offersModel}) {
    this.#pointsContainer = pointsContainer;
    this.#points = pointsModel.allPoints;
    this.#destinationModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#renderPointBoard();
  }

  #handlePointsChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
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
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#pointsContainer);
  }

  #sortPoints(type) {
    switch (type) {
      case SortTypes.TIME:
        this.#points.sort(sortPointByTime);
        break;
      case SortTypes.PRICE:
        this.#points.sort(sortPointByPrice);
        break;
      case SortTypes.DAY:
        this.#points.sort(sortPointByDay);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = type;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointListComponent.element,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
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
      render(this.#noPointComponent, this.#pointListComponent.element, 'afterbegin');
    }
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
