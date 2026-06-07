import {render, replace, remove, RenderPosition} from '../framework/render.js';
import {
  getTripCost,
  getTripDates,
  getTripTitle,
} from '../utils/trip.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripMainContainer = null;
  #tripModel = null;
  #tripInfoComponent = null;

  constructor({tripMainContainer, tripModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripModel = tripModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const points = this.#tripModel.points;
    const destinations = this.#tripModel.destinations;
    const offers = this.#tripModel.offers;

    const prevTripInfoComponent = this.#tripInfoComponent;

    if (points.length === 0) {
      if (prevTripInfoComponent !== null) {
        remove(prevTripInfoComponent);
        this.#tripInfoComponent = null;
      }

      return;
    }

    this.#tripInfoComponent = new TripInfoView({
      title: getTripTitle(points, destinations),
      dates: getTripDates(points),
      cost: getTripCost(points, offers),
    });

    if (prevTripInfoComponent === null) {
      render(
        this.#tripInfoComponent,
        this.#tripMainContainer,
        RenderPosition.AFTERBEGIN
      );

      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
