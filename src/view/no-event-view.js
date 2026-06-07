import AbstractView from '../framework/view/abstract-view.js';

const createNoEventTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class NoEventView extends AbstractView {
  #message = null;

  constructor({message}) {
    super();

    this.#message = message;
  }

  get template() {
    return createNoEventTemplate(this.#message);
  }
}
