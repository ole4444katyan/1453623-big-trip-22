import dayjs from 'dayjs';
import {DATE_FORMAT, FilterTypes} from './const.js';

const MS_IN_DAY = 86400000;
const MS_IN_HOUR = 3600000;


function getRandomFromRange (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement (items) {
  return items[getRandomFromRange(0, items.length - 1)];
}

function humanizeTime (timePoint, format) {
  return timePoint ? dayjs(timePoint).format(format) : '';
}

function shortDateHumanize (date) {
  return humanizeTime(date, DATE_FORMAT.shortDate);
}

function timeHumanize (time) {
  return humanizeTime(time, DATE_FORMAT.time);
}

function datetimeHumanize (date) {
  return humanizeTime(date, DATE_FORMAT.datetime);
}

function slashDateHumanize (date) {
  return humanizeTime(date, DATE_FORMAT.slashDate);
}

function durationEvent (startTime, endTime) {
  const duration = dayjs(endTime).diff(startTime);
  let timeFormat = 'D[D] HH[H] mm[M]';
  if (duration < MS_IN_DAY) {
    timeFormat = 'HH[H] mm[M]';
  }
  if (duration < MS_IN_HOUR) {
    timeFormat = 'mm[M]';
  }
  return dayjs(duration).format(timeFormat);
}

function createUniqueId (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomFromRange(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomFromRange(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
}

const filterFunctions = {
  [FilterTypes.EVERYTHING]: (points) => [...points],
  [FilterTypes.PRESENT]: (points) => points.filter((point) => dayjs().isBefore(dayjs(point.dateTo)) && dayjs().isAfter(dayjs(point.dateFrom))),
  [FilterTypes.PAST]: (points) => points.filter((point) => dayjs().isAfter(dayjs(point.dateTo))),
  [FilterTypes.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(dayjs(point.dateFrom))),
};


const updateItem = (itemsArray, update) => itemsArray.map(
  (item) => item.id === update.id ? update : item);

export {
  getRandomArrayElement,
  getRandomFromRange,
  durationEvent,
  humanizeTime,
  createUniqueId,
  shortDateHumanize,
  timeHumanize,
  datetimeHumanize,
  slashDateHumanize,
  filterFunctions,
  updateItem,
};
