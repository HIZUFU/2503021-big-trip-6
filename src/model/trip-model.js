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

  updatePoint(updatedPoint) {
    const pointIndex = this.#points.findIndex(
      (point) => point.id === updatedPoint.id
    );

    if (pointIndex === -1) {
      throw new Error('Can not update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, pointIndex),
      updatedPoint,
      ...this.#points.slice(pointIndex + 1),
    ];
  }
}
