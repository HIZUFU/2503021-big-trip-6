import {render} from '../render.js';
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
    const destinations = this.#tripModel.destinations;
    const offers = this.#tripModel.offers;

    const firstPoint = points[0];

    if (firstPoint) {
      const firstDestination = destinations.find(
        (destination) => destination.id === firstPoint.destinationId
      );

      const firstAvailableOffers = offers.filter(
        (offer) => offer.type === firstPoint.type
      );

      render(
        new EventEditView({
          point: firstPoint,
          destination: firstDestination,
          destinations,
          availableOffers: firstAvailableOffers,
        }),
        this.#eventListElement
      );
    }

    points.forEach((point) => {
      const destination = destinations.find(
        (item) => item.id === point.destinationId
      );

      const selectedOffers = offers.filter(
        (offer) => point.offerIds.includes(offer.id)
      );

      render(
        new EventView({
          point,
          destination,
          selectedOffers,
        }),
        this.#eventListElement
      );
    });
  }
}
