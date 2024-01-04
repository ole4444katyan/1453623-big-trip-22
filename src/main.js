import Presenter from './presenter/presenter.js';

// models
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

// mocks
import BinderMock from './mock/binder-mock.js';

const siteMainElement = document.querySelector('.page-main');
const sitePointsElement = siteMainElement.querySelector('.trip-events');

const binderMock = new BinderMock();
const destinationsModel = new DestinationsModel(binderMock);
const offersModel = new OffersModel(binderMock);
const pointsModel = new PointsModel(binderMock);

const eventPresenter = new Presenter({
  pointsContainer: sitePointsElement,
  destinationsModel,
  offersModel,
  pointsModel
});

eventPresenter.init();
