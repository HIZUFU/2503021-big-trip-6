import {render, replace} from '../framework/render.js';
import {FilterType, NoEventMessage} from '../const.js';
import {filter, generateFilters} from '../utils/filter.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';
import NoEventView from '../view/no-event-view.js';

export default class TripPresenter {
  #filterContainer = null;
  #tripEventsContainer = null;
  #eventListElement = null;
  #tripModel = null;
  #currentFilterType = FilterType.EVERYTHING;

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
    const destinations = this.#tripModel.destinations;
    const offers = this.#tripModel.offers;

    const destination = destinations.find(
      (item) => item.id === point.destinationId
    );

    const selectedOffers = offers.filter(
      (offer) => point.offerIds.includes(offer.id)
    );

    const availableOffers = offers.filter(
      (offer) => offer.type === point.type
    );

    let eventComponent = null;
    let eventEditComponent = null;

    function replaceFormToEvent() {
      replace(eventComponent, eventEditComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function escKeyDownHandler(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToEvent();
      }
    }

    const replaceEventToForm = () => {
      replace(eventEditComponent, eventComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    };

    eventComponent = new EventView({
      point,
      destination,
      selectedOffers,
      onEditClick: replaceEventToForm,
    });

    eventEditComponent = new EventEditView({
      point,
      destination,
      destinations,
      availableOffers,
      onFormSubmit: replaceFormToEvent,
      onRollupClick: replaceFormToEvent,
    });

    render(eventComponent, this.#eventListElement);
  }
}
