import AbstractView from '../framework/view/abstract-view';

function createListPointsTemplate () {

  return (
    `<ul class="trip-events__list">
    </ul>`
  );
}

export default class ListPointsView extends AbstractView {
  get template() {
    return createListPointsTemplate();
  }
}
