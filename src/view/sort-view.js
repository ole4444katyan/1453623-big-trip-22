import AbstractView from '../framework/view/abstract-view.js';
import {SortTypes, sortValues} from '../const.js';


function createSortItemsTemplate (currentSortType) {
  return sortValues.map((value) => {
    const isDisabled = value === SortTypes.EVENT || value === SortTypes.OFFERS;
    return `
    <div class="trip-sort__item  trip-sort__item--${value}">
      <input
        id="sort-${value}"
        class="trip-sort__input
        visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${value}"
        data-sort-type="${value}"
        ${isDisabled ? 'disabled' : ''}
        ${currentSortType === value ? 'checked' : ''}
      >
      <label class="trip-sort__btn" for="sort-${value}">${value}</label>
    </div>`;
  }).join('');
}

function createSortTemplate (currentSortType = SortTypes.DAY) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortItemsTemplate(currentSortType)}
    </form>`
  );
}

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;
  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);

  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (event) => {
    if (event.target.tagName !== 'INPUT') {
      return;
    }
    // console.log(event.target.dataset);
    event.preventDefault();
    this.#handleSortTypeChange(event.target.dataset.sortType);
  };
}
