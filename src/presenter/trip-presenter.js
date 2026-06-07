import {render} from '../framework/render.js';
import {FilterType, NoEventMessage} from '../const.js';
import {filter, generateFilters} from '../utils/filter.js';
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
  #eventPresenters = new Map();

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

    const filteredPoints = filter[this.#currentFilterType](points);

    if (filteredPoints.length === 0) {
      render(
        new NoEventView({
          message: NoEventMessage[this.#currentFilterType],
        }),
        this.#tripEventsContainer
      );

      return;
    }

    render(new SortView(), this.#tripEventsContainer);

    this.#eventListElement = document.createElement('ul');
    this.#eventListElement.classList.add('trip-events__list');
    this.#tripEventsContainer.append(this.#eventListElement);

    filteredPoints.forEach((point) => {
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
