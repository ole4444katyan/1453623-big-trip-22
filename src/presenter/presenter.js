import InfoTempate from '../view/info-view.js';
import FilterTempate from '../view/list-filter-view.js';

import ListEventsTempate from '../view/list-events-view.js';
import SortTempate from '../view/list-sort-view.js';
import EventTempate from '../view/event-view.js';
import EditingEventTempate from '../view/editing-event-view.js';
// import NewEventTempate from '../view/new-event-view.js';

import PointModel from '../model/point-model.js';


import {render} from '../render.js';


const siteHeaderElement = document.querySelector('.page-header');

const siteFiltersElement = siteHeaderElement.querySelector('.trip-main__trip-controls');
const siteInfoElement = siteHeaderElement.querySelector('.trip-main');

export default class Presenter {
  eventListComponent = new ListEventsTempate();

  constructor({eventContainer}) {
    this.eventContainer = eventContainer;
    this.pointModel = new PointModel();
  }

  init() {
    this.pointList = [...this.pointModel.getPoints()];

    render(new FilterTempate(), siteFiltersElement);
    render(new InfoTempate(), siteInfoElement, 'afterbegin');

    render(new SortTempate, this.eventContainer);
    render(this.eventListComponent, this.eventContainer);
    // render(new EditingEventTempate(), this.eventListComponent.getElement(), 'afterbegin');
    // render(new NewEventTempate(), this.eventListComponent.getElement());


    for (let i = 0; i < this.pointList.length; i++) {
      render(new EventTempate({point: this.pointList[i]}), this.eventListComponent.getElement());
    }
  }
}
