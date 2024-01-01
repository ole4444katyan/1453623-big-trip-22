import './ui-blocker.css';

/**
 * Класс для блокировки интерфейса
 */
export default class UiBlocker {
  /** @type {number} Время до блокировки интерфейса в миллисекундах */
  #lowerLimit;

  /** @type {number} Минимальное время блокировки интерфейса в миллисекундах */
  #upperLimit;

  /** @type {HTMLElement|null} Элемент, блокирующий интерфейс */
  #element;

  /** @type {number} Время вызова метода block */
  #startTime;

  /** @type {number} Время вызова метода unblock */
  #endTime;

  /** @type {number} Идентификатор таймера */
  #timerId;

  /**
   * @param {Object} config Объект с настройками блокировщика
   * @param {number} config.lowerLimit Время до блокировки интерфейса в миллисекундах. Если вызвать метод unblock раньше, то интерфейс заблокирован не будет
   * @param {number} config.upperLimit Минимальное время блокировки в миллисекундах. Минимальная длительность блокировки
   */
  constructor({lowerLimit, upperLimit}) {
    this.#lowerLimit = lowerLimit;
    this.#upperLimit = upperLimit;

    this.#element = document.createElement('div');
    this.#element.classList.add('ui-blocker');
    document.body.append(this.#element);
  }

  /** Метод для блокировки интерфейса */
  block() {
    this.#startTime = Date.now();
    this.#timerId = setTimeout(() => {
      this.#activateBlocking();
    }, this.#lowerLimit);
  }

  /** Метод для разблокировки интерфейса */
  unblock() {
    this.#endTime = Date.now();
    const duration = this.#endTime - this.#startTime;

    if (duration < this.#lowerLimit) {
      clearTimeout(this.#timerId);
      return;
    }

    if (duration >= this.#upperLimit) {
      this.#disactivateBlocking();
      return;
    }

    setTimeout(this.#disactivateBlocking, this.#upperLimit - duration);
  }

  /** Метод, добавляющий CSS-класс и обработчик */
  #activateBlocking = () => {
    this.#element.classList.add('ui-blocker--on');
    document.addEventListener('keydown', this.#documentKeydownHandler);
  };

  /** Метод, убирающий CSS-класс и обработчик */
  #disactivateBlocking = () => {
    this.#element.classList.remove('ui-blocker--on');
    document.removeEventListener('keydown', this.#documentKeydownHandler);
  };

  #documentKeydownHandler = (evt) => {
    evt.preventDefault();
  };
}
