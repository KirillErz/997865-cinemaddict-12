import {createElement} from "../utils.js";

const isNotMovie = () => {
  return `<h2 class="films-list__title">All movies. Upcoming</h2>`
};


export default class ServiceReplies {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return isNotMovie();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
