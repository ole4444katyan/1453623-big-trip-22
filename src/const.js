const POINT_COUNT = 30;
const PICTURE_COUNT = 5;
const DESTINATION_COUNT = 6;
const OFFER_COUNT = 3;

const TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const CITIES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'Berlin',
  'Zurich',
  'Moskow',
];

const OFFERS = [
  'Rent a car',
  'Add luggage',
  'Switch to comfort',
  'Order Uber',
  'Add breakfast',
];

const PRICE = {
  min: 20,
  max: 1000,
};

const DATE_FORMAT = {
  shortDate: 'D MMM',
  time: 'HH:mm',
  slashDate: 'DD/MM/YY HH:mm',
  datetime: 'YYYY-MM-DD HH:mm'
};

const DURATION = {
  hour: 2,
  day: 1,
  min: 20,
};

const FilterTypes = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past'
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const sortValues = Object.values(SortTypes);

const MODE = {
  default: 'default',
  editing: 'editing',
};

const EDIT_TYPE = {
  EDITING: 'editing',
  CREATING: 'creating',
};

export {
  POINT_COUNT,
  PICTURE_COUNT,
  DESTINATION_COUNT,
  OFFER_COUNT,
  TYPES,
  DESCRIPTIONS,
  CITIES,
  OFFERS,
  PRICE,
  DATE_FORMAT,
  DURATION,
  FilterTypes,
  SortTypes,
  sortValues,
  MODE,
  EDIT_TYPE,
};

