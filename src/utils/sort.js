import {SortType} from '../const.js';

const getPointDuration = (point) =>
  new Date(point.dateTo) - new Date(point.dateFrom);

const sortPoint = {
  [SortType.DAY]: (points) =>
    [...points].sort((pointA, pointB) =>
      new Date(pointA.dateFrom) - new Date(pointB.dateFrom)
    ),

  [SortType.TIME]: (points) =>
    [...points].sort((pointA, pointB) =>
      getPointDuration(pointB) - getPointDuration(pointA)
    ),

  [SortType.PRICE]: (points) =>
    [...points].sort((pointA, pointB) =>
      pointB.basePrice - pointA.basePrice
    ),
};

export {sortPoint};
