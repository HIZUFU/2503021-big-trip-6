import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

const createSortButtonTemplate = ({type, title, isDisabled}, currentSortType) => {
  const activeClassName = type === currentSortType ? 'trip-sort__btn--active' : '';
  const disabledAttribute = isDisabled ? 'disabled' : '';

  return (
    `<button
      class="trip-sort__btn ${activeClassName}"
      type="button"
      data-sort-type="${type}"
      ${disabledAttribute}
    >
      ${title}
    </button>`
  );
};

const createSortTemplate = (currentSortType) => {
  const sortItems = [
    {
      type: SortType.DAY,
      title: 'Day',
      isDisabled: false,
    },
    {
      type: 'event',
      title: 'Event',
      isDisabled: true,
    },
    {
      type: SortType.TIME,
      title: 'Time',
      isDisabled: false,
    },
    {
      type: SortType.PRICE,
      title: 'Price',
      isDisabled: false,
    },
    {
      type: 'offers',
      title: 'Offers',
      isDisabled: true,
    },
  ];

  return (
    `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${sortItems
      .map((sortItem) => createSortButtonTemplate(sortItem, currentSortType))
      .join('')}
    </form>`
  );
};

export default class SortView extends AbstractView {
  #currentSortType = SortType.DAY;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();

    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    const sortButton = evt.target.closest('.trip-sort__btn');

    if (!sortButton || sortButton.disabled) {
      return;
    }

    evt.preventDefault();

    this.#handleSortTypeChange(sortButton.dataset.sortType);
  };
}
