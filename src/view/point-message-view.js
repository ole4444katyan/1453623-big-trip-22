import {createElement} from '../render.js';

function createPointMessageTemplate () {

  return (
    '<p class="trip-events__msg">Click New Event to create your first point</p>'
  );
}

export default class PointMessageView {
  getTemplate() {
    return createPointMessageTemplate();
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
