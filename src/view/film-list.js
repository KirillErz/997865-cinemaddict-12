
import {createElement} from "../utils.js";

const createListFilmTemplate = () => {
  return `<section class="films-list">
  <div class="films-list__container">
  </div>
</section>`;
};


export default class FilmListView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createListFilmTemplate();
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
