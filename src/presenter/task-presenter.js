import PointView from '../view/point-view.js';
import EditingPointView from '../view/editing-point-view.js';
import NoPointMessageView from '../view/no-point-message-view.js';

// import {POINT_COUNT_PER_STEP} from '../const.js';


import {render, replace} from '../framework/render.js';


export default class PointPresenter {
  #points = null;
  #pointListComponent = null;
  #destinationModel = null;
  #offers = null;
  #pointsContainer = null;

  #noPointComponent = new NoPointMessageView();

  constructor({points, pointListComponent, destinationModel, offers, pointsContainer}) {
    this.#points = points;
    this.#pointListComponent = pointListComponent;
    this.#destinationModel = destinationModel;
    this.#offers = offers;
    this.#pointsContainer = pointsContainer;
  }

  init () {
    if (this.#points.every((point) => !point)) {
      this.#renderNoPoints();
      return;
    }

    //this.#renderSort();
    this.#renderPoints();
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

  #renderPoints () {
    this.#points.forEach((point) => this.#renderPoint(({
      point: point,
      pointDestinations: this.#destinationModel.getById(point.destination),
      pointOffers: this.#offers.getByType(point.type)
    })));
  }

  #renderNoPoints () {
    render(this.#noPointComponent, this.#pointsContainer, 'afterbegin');
  }

  /* #renderSort () {
  }
  */
}
