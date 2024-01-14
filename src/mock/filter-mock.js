import {filterFunctions} from '../utils.js';

/**
 * Возвращает массив объектов с типом фильтра и функции фильтрации
*/
function filteredPoints () {
  return Object.entries(filterFunctions).map(([type, getPoints]) => ({
    type,
    getPoints,
  }));
}

export {filteredPoints};
