import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripModel from './model/trip-model.js';
import FilterModel from './model/filter-model.js';
import {destinations, offers, points} from './mock/trip-data.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

const tripModel = new TripModel({
  points,
  destinations,
  offers,
});

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripEventsContainer,
  tripModel,
  filterModel,
  newEventButton,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  tripModel,
  filterModel,
});

filterPresenter.init();
tripPresenter.init();
