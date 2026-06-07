import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const createFilterItemTemplate = ({type, count}, currentFilterType) => {
  const isChecked = type === currentFilterType ? 'checked' : '';
  const isDisabled = count === 0 ? 'disabled' : '';

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${isChecked}
        ${isDisabled}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">
        ${type}
      </label>
    </div>`
  );
};

const createFilterTemplate = (filters, currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  #filters = [];
  #currentFilterType = FilterType.EVERYTHING;

  constructor({filters, currentFilterType}) {
    super();

    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }
}
