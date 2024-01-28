import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {
  slashDateHumanize,
} from '../utils.js';
import {CITIES, TYPES,} from '../const.js';

function createDestinationsTemplate (places) {
  return (`${
    places.map(
      (place) => `<option value="${place}"></option>`
    ).join('')
  }`);
}

function createTypeTemplate (types, currentType) {
  return (`${
    types.map(
      (type) => `<div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="${type.toLowerCase()}" ${currentType === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
      </div>`
    ).join('')
  }`);
}

function createOffersTemplate (offers, state) {
  return (`${
    offers.map((offer, index) => {
      const checked = state.offers.includes(offer.id) ? 'checked' : '';
      return (`
      <div class="event__offer-selector">
      <input
        class="event__offer-checkbox
        visually-hidden"
        id="event-offer-luggage-${index + 1}"
        type="checkbox"
        name="event-offer-luggage"
        checked
        data-offer-id=${offer.id} ${checked}
      >
      <label
        class="event__offer-label"
        for="event-offer-luggage-${index + 1}"
      >
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`);
    }).join('')
  }`);
}

function createEditingPointTemplate ({state, destinations, pointOffers}) {
  const {basePrice, dateFrom, dateTo, type} = state;
  const {name, description} = destinations;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTypeTemplate(TYPES, type)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createDestinationsTemplate(CITIES)}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${slashDateHumanize(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${slashDateHumanize(dateTo)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${pointOffers ? createOffersTemplate(pointOffers, state) : ''}
            </div>
          </section>
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
  #point = null;
  #destinations = null;
  #allDestinations = null;
  #pointOffers = null;
  #onResetClick = null;
  #onFormSubmit = null;

  constructor({point, pointDestinations, destinations, pointOffers, onResetClick, onFormSubmit}) {
    super();
    this._state = point;
    this._setState(EditingPointView.parsePointToState({point}));

    this.#destinations = pointDestinations;
    this.#allDestinations = destinations;
    this.#pointOffers = pointOffers;
    this._restoreHandlers();
    this.#onResetClick = onResetClick;
    this.#onFormSubmit = onFormSubmit;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('form')
      .addEventListener('submit', this.#pointEditSubmitHandler);

  }

  get template() {
    return createEditingPointTemplate({
      state: this._state,
      destinations: this.#destinations,
      pointOffers: this.#pointOffers
    });
  }

  #editClickHandler = (event) => {
    event.preventDefault();
    this.#onResetClick();
  };

  #pointEditSubmitHandler = (event) => {
    event.preventDefault();
    this.#onFormSubmit(EditingPointView.parseStateToPoint(this._state));
  };

  _restoreHandlers () {

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

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
  }

  #typeChangeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };

  #destinationChangeHandler = (evt) => {

    const selectedDestination = this.#allDestinations.find((destination) => destination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : this._state.point.destination;

    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestinationId
      }
    });
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      point: {
        ...this._state.point,
        offers: Array.from(checkedBoxes.map((element) => (Number(element.dataset.offerId))))
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value
      }
    });
  };

  static parsePointToState = ({point}) => ({point});
  static parseStateToPoint = (state) => state.point;
}
