export default class TripModel {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({points, destinations, offers}) {
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
