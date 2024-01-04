import {createElement} from '../render.js';

function createListPointsTemplate () {

  return (
    `<ul class="trip-events__list">
    </ul>`
  );
}

export default class ListPointsView {
  getTemplate() {
    return createListPointsTemplate();
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
