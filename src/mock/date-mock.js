import dayjs from 'dayjs';
import {DURATION} from '../const.js';
import {getRandomFromRange} from '../utils.js';

let date = dayjs().subtract(getRandomFromRange(0, DURATION.day), 'day').toDate();


function getDate ({dateTo}) {
  const minsGap = getRandomFromRange(0, DURATION.min);
  const hoursGap = getRandomFromRange(0, DURATION.hour);
  const daysGap = getRandomFromRange(0, DURATION.day);

  if (dateTo) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }
  return date;
}

export {getDate};
