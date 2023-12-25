import {createElement} from '../render.js';
import {humanizeTime, getRandomFromRange} from '../utils.js';
import {DATE_FORMAT, CITIES, TYPES, OFFERS, PRICE} from '../const.js';

function createDestinationOption (places) {
  let destinationOption = '';
  for (let i = 0; i < places.length; i++) {
    destinationOption += `<option value="${places[i]}"></option>`;
  }
  return destinationOption;
}

function createTypeOption (types) {
  let typesOption = '';
  for (let i = 0; i < types.length; i++) {
    const typeLowerCase = types[i].toLowerCase();

    typesOption += `<div class="event__type-item">
    <input id="event-type-${typeLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeLowerCase}">
    <label class="event__type-label  event__type-label--${typeLowerCase}" for="event-type-${typeLowerCase}-1">${types[i]}</label>
    </div>`;
  }
  return typesOption;
}

function createOfferSelector (offers, price, isChecked) {
  const {min, max} = price;
  const checked = isChecked ? 'checked' : '';
  let typesOffer = '';
  for (let i = 0; i < offers.length; i++) {
    typesOffer += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${checked}>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${offers[i]}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${getRandomFromRange(min, max)}</span>
      </label>
    </div>`;
  }
  return typesOffer;
}

function createEditingEventTemplate (point) {
  const {type, place, startTime, endTime, price, description} = point;
  const startDateHumanize = humanizeTime(startTime, DATE_FORMAT.slashDate);
  const endDateHumanize = humanizeTime(endTime, DATE_FORMAT.slashDate);


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
                ${createTypeOption(TYPES)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${place}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createDestinationOption(CITIES)}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateHumanize}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateHumanize}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
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
            ${createOfferSelector(OFFERS, PRICE, false)}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class EditingEventTempate {

  constructor ({point}) {
    this.point = point;
  }

  getTemplate() {
    return createEditingEventTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
