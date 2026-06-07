import TripPresenter from './presenter/trip-presenter.js';
import TripModel from './model/trip-model.js';
import {destinations, offers, points} from './mock/trip-data.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripModel = new TripModel({
  points,
  destinations,
  offers,
});

const tripPresenter = new TripPresenter({
  filterContainer: filtersContainer,
  tripEventsContainer,
  tripModel,
});

tripPresenter.init();
