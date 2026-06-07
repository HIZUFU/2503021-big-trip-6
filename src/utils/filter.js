import {FilterType} from '../const.js';

const isFuturePoint = (point) => new Date(point.dateFrom) > new Date();

const isPresentPoint = (point) => {
  const now = new Date();
  const dateFrom = new Date(point.dateFrom);
  const dateTo = new Date(point.dateTo);

  return dateFrom <= now && dateTo >= now;
};

const isPastPoint = (point) => new Date(point.dateTo) < new Date();

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentPoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point)),
};

const generateFilters = (points) => Object.values(FilterType).map((type) => ({
  type,
  count: filter[type](points).length,
}));

export {filter, generateFilters};
