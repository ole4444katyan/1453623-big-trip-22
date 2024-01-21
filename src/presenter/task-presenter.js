import PointView from '../view/point-view.js';
import EditingPointView from '../view/editing-point-view.js';

import {render, replace, remove} from '../framework/render.js';


export default class PointPresenter {
  #point = null;
  #pointListComponent = null;
  #destinationModel = null;
  #offers = null;
  #pointsContainer = null;
  #handleDataChange = null;


  #pointComponent = null;
  #pointEditComponent = null;

  constructor({pointsContainer, destinationModel, offers, onDataChange,}) {
    this.#pointsContainer = pointsContainer;
    this.#destinationModel = destinationModel;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      pointDestinations: this.#destinationModel.getById(this.#point.destination),
      pointOffers: this.#offers.getByType(this.#point.type),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditingPointView ({
      point: this.#point,
      pointDestinations: this.#destinationModel.getById(this.#point.destination),
      pointOffers: this.#offers.getByType(this.#point.type),
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#pointsContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
