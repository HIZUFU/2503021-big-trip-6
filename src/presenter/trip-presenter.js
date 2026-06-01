import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventNewView from '../view/event-new-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

const POINT_COUNT = 3;

export default class TripPresenter {
  #filterContainer = null;
  #tripEventsContainer = null;
  #eventListElement = null;

  constructor({filterContainer, tripEventsContainer}) {
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#tripEventsContainer);

    this.#eventListElement = document.createElement('ul');
    this.#eventListElement.classList.add('trip-events__list');
    this.#tripEventsContainer.append(this.#eventListElement);

    render(new EventEditView(), this.#eventListElement);
    render(new EventNewView(), this.#eventListElement);

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new EventView(), this.#eventListElement);
    }
  }
}
