import Presenter from './presenter/presenter.js';

const siteMainElement = document.querySelector('.page-main');
const siteEventsElement = siteMainElement.querySelector('.trip-events');

const eventPresenter = new Presenter({eventContainer: siteEventsElement});

eventPresenter.init();
