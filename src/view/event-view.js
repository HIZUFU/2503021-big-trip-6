import AbstractView from './abstract-view.js';

const humanizeEventDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {month: 'short', day: '2-digit'}).toUpperCase();

const humanizeEventTime = (date) =>
  new Date(date).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});

const getDuration = (dateFrom, dateTo) => {
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);
  const duration = endDate - startDate;
  const minutes = Math.floor(duration / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${String(hours % 24).padStart(2, '0')}H ${String(minutes % 60).padStart(2, '0')}M`;
  }

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes % 60).padStart(2, '0')}M`;
  }

  return `${String(minutes).padStart(2, '0')}M`;
};

const createOfferTemplate = (offer) => (
  `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`
);

function createEventTemplate({point, destination, selectedOffers}) {
  const favoriteClassName = point.isFavorite ? 'event__favorite-btn--active' : '';
  const offersTemplate = selectedOffers.map((offer) => createOfferTemplate(offer)).join('');

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${point.dateFrom}">${humanizeEventDate(point.dateFrom)}</time>

        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>

        <h3 class="event__title">${point.type} ${destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${point.dateFrom}">${humanizeEventTime(point.dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${point.dateTo}">${humanizeEventTime(point.dateTo)}</time>
          </p>
          <p class="event__duration">${getDuration(point.dateFrom, point.dateTo)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>

        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-1.03-.93C7.8 15.4 4 11.97 4 7.75 4 4.32 6.69 2 10 2c1.86 0 3.64.86 4 2.21C14.36 2.86 16.14 2 18 2c3.31 0 6 2.32 6 5.75 0 4.22-3.8 7.65-8.97 12.32L14 21z"/>
          </svg>
        </button>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class EventView extends AbstractView {
  #point = null;
  #destination = null;
  #selectedOffers = [];

  constructor({point, destination, selectedOffers}) {
    super();

    this.#point = point;
    this.#destination = destination;
    this.#selectedOffers = selectedOffers;
  }

  getTemplate() {
    return createEventTemplate({
      point: this.#point,
      destination: this.#destination,
      selectedOffers: this.#selectedOffers,
    });
  }
}
