import PointView from '../view/point-view.js';
import EditingPointView from '../view/editing-point-view.js';


import {render, replace} from '../framework/render.js';


export default class PointPresenter {
  #pointListComponent = null;
  #points = null;
  #destinationModel = null;
  #offers = null;

  constructor({pointListComponent, points, destinationModel, offers}) {
    this.#pointListComponent = pointListComponent;
    this.#points = points;
    this.#destinationModel = destinationModel;
    this.#offers = offers;
  }

  init(point) {
    return this.#renderPoint({
      point: point,
      pointDestinations: this.#destinationModel.getById(point.destination),
      pointOffers: this.#offers.getByType(point.type)
    });
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
