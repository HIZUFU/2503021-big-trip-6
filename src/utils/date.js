import dayjs from 'dayjs';

const DateFormat = {
  EVENT_DATE: 'MMM DD',
  EVENT_TIME: 'HH:mm',
  EDIT_FORM: 'DD/MM/YY HH:mm',
};

const MSEC_IN_MINUTE = 60000;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;

const humanizeEventDate = (date) =>
  dayjs(date).format(DateFormat.EVENT_DATE).toUpperCase();

const humanizeEventTime = (date) =>
  dayjs(date).format(DateFormat.EVENT_TIME);

const humanizeEditFormDate = (date) => {
  if (!date) {
    return '';
  }

  return dayjs(date).format(DateFormat.EDIT_FORM);
};

const getDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  const minutes = Math.floor(diff / MSEC_IN_MINUTE);

  const days = Math.floor(minutes / MINUTES_IN_DAY);
  const hours = Math.floor((minutes % MINUTES_IN_DAY) / MINUTES_IN_HOUR);
  const restMinutes = minutes % MINUTES_IN_HOUR;

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(restMinutes).padStart(2, '0')}M`;
  }

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(restMinutes).padStart(2, '0')}M`;
  }

  return `${String(restMinutes).padStart(2, '0')}M`;
};

export {
  humanizeEventDate,
  humanizeEventTime,
  humanizeEditFormDate,
  getDuration,
};
