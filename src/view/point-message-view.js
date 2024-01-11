import AbstractView from '../framework/view/abstract-view.js';

function createPointMessageTemplate () {

  return (
    '<p class="trip-events__msg">Click New Event to create your first point</p>'
  );
}

export default class PointMessageView extends AbstractView {
  get template() {
    return createPointMessageTemplate();
  }
}

