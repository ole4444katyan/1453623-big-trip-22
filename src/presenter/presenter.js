// views
import InfoView from '../view/info-view.js';
import FilterView from '../view/list-filter-view.js';

import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/list-sort-view.js';
import PointView from '../view/point-view.js';
import EditingPointView from '../view/editing-point-view.js';

// utils
import {render, replace} from '../framework/render.js';


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

    render(new FilterView(), siteFiltersElement);
    render(new InfoView(), siteInfoElement, 'afterbegin');

    render(new SortView, this.#pointsContainer);
    render(this.#pointListComponent, this.#pointsContainer);


    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint({
        point: this.#points[i],
        pointDestinations: this.#destinationModel.getById(this.#points[i].destination),
        pointOffers: this.#offers.getByType(this.#points[i].type)
      });
    }
  }

  #renderPoint ({point, pointDestinations, pointOffers}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      pointDestinations,
      pointOffers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditingPointView ({
      point,
      pointDestinations,
      pointOffers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }
}
