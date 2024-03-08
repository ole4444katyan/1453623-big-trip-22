import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {
  slashDateHumanize,
} from '../utils.js';
import {MODE, EDIT_TYPE} from '../const.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createDestinationsTemplate (allDestinations) {
  const cityDestinations = Array.from(new Set(allDestinations.map((item) => item.name)));
  return (`
  <datalist id="destination-list-1">
  ${
    cityDestinations.map(
      (city) => `<option value="${city}"></option>`
    ).join('')
    }
  </datalist>
  `);
}


function createTypeTemplate (allOffers, currentType) {
  return (`${
    allOffers.map(
      (offer) => `<div class="event__type-item">
        <input id="event-type-${offer.type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="${offer.type.toLowerCase()}" ${currentType === offer.type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${offer.type.toLowerCase()}" for="event-type-${offer.type.toLowerCase()}-1">${offer.type}</label>
      </div>`
    ).join('')
  }`);
}

function createOffersTemplate (offersByType, state) {
  return (`
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
  ${
    offersByType.map(
      (offer) => {
        const checked = state.offers.includes(offer.id) ? 'checked' : '';
        return (
          `<div class="event__offer-selector">
          <input class="event__offer-checkbox
          visually-hidden"
          id="event-offer-${offer.id}"
          type="checkbox"
          name="event-offer-${offer.id}"
          data-offer-id=${offer.id}
          ${checked}>
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`);
      }).join('')
    }
  </div>
  </section>
  `);

}

function createButtonsTemplate (isCreating, isDeleting, isDisabled) {
  if (isCreating) {
    return `
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>
    `;
  }
  return `
    <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting' : 'Delete'}</button>
    <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}><span class="visually-hidden">Open event</span></button>
    `;
}

function createEditingPointTemplate ({state, allDestinations, allOffers, mode}) {
  const {basePrice, dateFrom, dateTo, type, destination} = state;
  const offersByType = allOffers.find((item) => item.type.toLowerCase() === state.type.toLowerCase()).offers;
  const destinationById = allDestinations.find((item) => item.id === destination);
  const {name, description} = destinationById;
  const offersTemplate = createOffersTemplate(offersByType, state);
  const typesTemplate = createTypeTemplate(allOffers, type);
  const {isDisabled, isSaving, isDeleting} = state;
  const isCreating = mode === EDIT_TYPE.CREATING;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17"
              src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typesTemplate}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
            value="${name}" list="destination-list-1">
            ${createDestinationsTemplate(allDestinations)}
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
            value="${slashDateHumanize(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
            value="${slashDateHumanize(dateTo)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price"
            value="${basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit"
          ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          ${createButtonsTemplate(isCreating, isDeleting, isDisabled)}
          </header>
        <section class="event__details">
          ${offersByType ? offersTemplate : ''}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${name} ${description.toLowerCase()}</p>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class EditingPointView extends AbstractStatefulView {

  #allDestinations = null;
  #allOffers = null;
  #onResetClick = null;
  #onFormSubmit = null;
  #onDeleteClick = null;
  #mode = null;
  #datepickerFrom = null;
  #datepickerTo = null;


  constructor({point, destinations, allOffers, onResetClick, onFormSubmit, onDeleteClick, mode = MODE.editing}) {
    super();
    this._state = point;
    this._setState(EditingPointView.parsePointToState(point));

    this.#allDestinations = destinations;
    this.#allOffers = allOffers;
    this._restoreHandlers();
    this.#onResetClick = onResetClick;
    this.#onFormSubmit = onFormSubmit;
    this.#onDeleteClick = onDeleteClick;
    this.#mode = mode;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#resetButtonClickHandler);

    this.element.querySelector('form')
      .addEventListener('submit', this.#pointEditSubmitHandler);

  }

  get template() {
    return createEditingPointTemplate({
      state: this._state,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      mode: this.#mode
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset = (point) => {
    this.updateElement(
      EditingPointView.parsePointToState(point),
    );
  };

  #resetButtonClickHandler = (event) => {
    event.preventDefault();
    this.#onResetClick();
  };

  #pointEditSubmitHandler = (event) => {
    event.preventDefault();
    this.#onFormSubmit(EditingPointView.parseStateToPoint(this._state));
  };

  _restoreHandlers () {
    if(this.#mode === EDIT_TYPE.EDITING) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#resetButtonClickHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
    }

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#resetButtonClickHandler);

    this.element.querySelector('form')
      .addEventListener('submit', this.#pointEditSubmitHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);

    this.element.querySelector('.event__input--price').
      addEventListener('change', this.#priceChangeHandler);

    this.#setDatepickers();

    if(this.#mode === EDIT_TYPE.CREATING) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
    }
  }

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {

    const selectedDestination = this.#allDestinations.find((destination) => destination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : this._state.destination;

    this.updateElement({
      destination: selectedDestinationId
    });
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      offers: Array.from(checkedBoxes.map((element) => (Number(element.dataset.offerId))))
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value
    });
  };

  #setDatepickers = () => {
    const dateFromElement = this.element.querySelector('#event-start-time-1');
    const dateToElement = this.element.querySelector('#event-end-time-1');

    const config = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      allowInput: true,
      'time_24hr': true,
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...config,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo,
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...config,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom,
      }
    );
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick(EditingPointView.parseStateToPoint(this._state));
  };

  static parsePointToState (point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    //delete point.isDisabled;
    //delete point.isSaving;
    //delete point.isDeleting;
    return point;
  }
}
