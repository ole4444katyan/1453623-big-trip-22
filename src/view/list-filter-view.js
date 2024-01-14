import AbstractView from '../framework/view/abstract-view.js';
import {FilterTypes} from '../const.js';

function createFilterItemsTemplate (points, filters, currentFilterType) {
  return filters.map(({type, getPoints}) => {
    const count = getPoints(points).length;
    return (`
    <div class="trip-filters__filter">
      <input id="filter-${type.toLowerCase()}"
      class="trip-filters__filter-input
      visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type.toLowerCase()}"
      ${count ? '' : 'disabled'}
      ${type === currentFilterType ? 'checked' : ''}>

      <label
      class="trip-filters__filter-label"
      for="filter-${type.toLowerCase()}">${type}
      </label>
    </div>

    </div>`);
  }).join('');
}


function createFilterTemplate (points, filters, currentFilterType = FilterTypes.EVERYTHING) {
  return (
    `<form class="trip-filters" action="#" method="get">
    ${createFilterItemsTemplate(points, filters, currentFilterType)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView{
  #points = null;
  #filters = null;

  constructor (points, filters) {
    super();
    this.#points = points;
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#points, this.#filters);
  }
}
