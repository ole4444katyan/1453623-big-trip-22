import {CITIES, DESCRIPTIONS, PICTURE_COUNT, POINT_COUNT, DESTINATION_COUNT} from '../const.js';
import {getRandomArrayElement, createUniqueId, getRandomFromRange} from '../utils.js';

const DESTINATIONS_COUNT = POINT_COUNT * DESTINATION_COUNT;

const destinationId = createUniqueId(1, DESTINATIONS_COUNT);

function generatePicture(city, description) {
  return {
    src: `img/photos/${getRandomFromRange(1, PICTURE_COUNT)}.jpg`,
    description: `${city} ${description}`,
  };
}

function generatePictures(city, description) {
  return Array.from({length: getRandomFromRange(1, PICTURE_COUNT)}, () => generatePicture(city, description));
}


function generateDestinationMock() {
  const city = getRandomArrayElement(CITIES);
  const description = getRandomArrayElement(DESCRIPTIONS);
  return {
    id: destinationId(),
    description: description,
    name: city,
    pictures: generatePictures(city, description),
  };
}

export {generateDestinationMock};
