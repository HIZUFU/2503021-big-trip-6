import {render, replace} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class TripPresenter {
  #filterContainer = null;
  #tripEventsContainer = null;
  #eventListElement = null;
  #tripModel = null;

  constructor({filterContainer, tripEventsContainer, tripModel}) {
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripModel = tripModel;
  }

  init() {
    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#tripEventsContainer);

    this.#eventListElement = document.createElement('ul');
    this.#eventListElement.classList.add('trip-events__list');
    this.#tripEventsContainer.append(this.#eventListElement);

    const points = this.#tripModel.points;

    points.forEach((point) => {
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

    const replaceEventToForm = () => {
      replace(eventEditComponent, eventComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    };

    const replaceFormToEvent = () => {
      replace(eventComponent, eventEditComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    function escKeyDownHandler(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToEvent();
      }
    }

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
