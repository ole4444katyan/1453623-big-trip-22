import dayjs from 'dayjs';

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

export {getRandomArrayElement, getRandomFromRange, durationEvent, humanizeTime};
