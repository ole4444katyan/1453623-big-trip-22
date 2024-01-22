import AbstractView from '../framework/view/abstract-view.js';
import { SortTypes } from '../const.js';

const sortValues = Object.values(SortTypes);


function createSortItemsTemplate (currentSortType) {
  return sortValues.map((value) => {
    const isDisabled = value === SortTypes.EVENT || value === SortTypes.OFFERS;
    return `
    <div class="trip-sort__item  trip-sort__item--${value}">
      <input id="sort-${value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${value}" ${isDisabled ? 'disabled' : ''} ${currentSortType === value ? 'checked' : ''}>
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
  get template() {
    return createSortTemplate();
  }
}
