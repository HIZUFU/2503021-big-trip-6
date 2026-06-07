import {render, remove} from '../framework/render.js';
import {FilterType, NoEventMessage, SortType} from '../const.js';
import {filter, generateFilters} from '../utils/filter.js';
import {sortPoint} from '../utils/sort.js';
import EventPresenter from './event-presenter.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import NoEventView from '../view/no-event-view.js';

export default class TripPresenter {
  #filterContainer = null;
  #tripEventsContainer = null;
  #eventListElement = null;
  #tripModel = null;
  #currentFilterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;
  #eventPresenters = new Map();
  #sortComponent = null;
  #noEventComponent = null;

  constructor({filterContainer, tripEventsContainer, tripModel}) {
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripModel = tripModel;
  }

  init() {
    const points = this.#tripModel.points;
    const filters = generateFilters(points);

    render(
      new FilterView({
        filters,
        currentFilterType: this.#currentFilterType,
      }),
      this.#filterContainer
    );

    this.#renderTrip();
  }

  #renderTrip() {
    const points = this.#tripModel.points;
    const filteredPoints = filter[this.#currentFilterType](points);

    if (filteredPoints.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEventList(filteredPoints);
  }

  #renderNoEvents() {
    this.#noEventComponent = new NoEventView({
      message: NoEventMessage[this.#currentFilterType],
    });

    render(this.#noEventComponent, this.#tripEventsContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderEventList(points) {
    const sortedPoints = sortPoint[this.#currentSortType](points);

    this.#eventListElement = document.createElement('ul');
    this.#eventListElement.classList.add('trip-events__list');
    this.#tripEventsContainer.append(this.#eventListElement);

    sortedPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const eventPresenter = new EventPresenter({
      container: this.#eventListElement,
      destinations: this.#tripModel.destinations,
      offers: this.#tripModel.offers,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init(point);

    this.#eventPresenters.set(point.id, eventPresenter);
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => {
      presenter.destroy();
    });

    this.#eventPresenters.clear();

    if (this.#eventListElement) {
      this.#eventListElement.remove();
      this.#eventListElement = null;
    }
  }

  #clearSort() {
    remove(this.#sortComponent);
    this.#sortComponent = null;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearSort();
    this.#clearEventList();

    const points = this.#tripModel.points;
    const filteredPoints = filter[this.#currentFilterType](points);

    this.#renderSort();
    this.#renderEventList(filteredPoints);
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripModel.updatePoint(updatedPoint);

    this.#eventPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };
}
