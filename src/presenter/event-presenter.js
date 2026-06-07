import {render, replace} from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class EventPresenter {
  #container = null;
  #destinations = [];
  #offers = [];
  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #eventComponent = null;
  #eventEditComponent = null;

  constructor({container, destinations, offers, onDataChange, onModeChange}) {
    this.#container = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    const destination = this.#destinations.find(
      (item) => item.id === this.#point.destinationId
    );

    const selectedOffers = this.#offers.filter(
      (offer) => this.#point.offerIds.includes(offer.id)
    );

    const availableOffers = this.#offers.filter(
      (offer) => offer.type === this.#point.type
    );

    this.#eventComponent = new EventView({
      point: this.#point,
      destination,
      selectedOffers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EventEditView({
      point: this.#point,
      destination,
      destinations: this.#destinations,
      availableOffers,
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#container.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }
  }

  resetView() {
    if (this.#container.contains(this.#eventEditComponent.element)) {
      this.#replaceFormToEvent();
    }
  }

  #replaceEventToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this.#replaceFormToEvent();
    }
  };

  #handleEditClick = () => {
    this.#handleModeChange();
    this.#replaceEventToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToEvent();
  };

  #handleRollupClick = () => {
    this.#replaceFormToEvent();
  };

  #handleFavoriteClick = (updatedPoint) => {
    this.#handleDataChange(updatedPoint);
  };
}
