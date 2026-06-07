import Observable from '../framework/observable.js';

export default class TripModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({points, destinations, offers}) {
    super();

    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  updatePoint(updateType, updatedPoint) {
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

    this._notify(updateType, updatedPoint);
  }

  addPoint(updateType, newPoint) {
    this.#points = [
      newPoint,
      ...this.#points,
    ];

    this._notify(updateType, newPoint);
  }

  deletePoint(updateType, pointToDelete) {
    const pointIndex = this.#points.findIndex(
      (point) => point.id === pointToDelete.id
    );

    if (pointIndex === -1) {
      throw new Error('Can not delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, pointIndex),
      ...this.#points.slice(pointIndex + 1),
    ];

    this._notify(updateType);
  }
}
