import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const createSortTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`;
};


export default class Sort extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }
  // проверка на ссылку что такое А?

  _clearSortStyle() {
    this._element.querySelectorAll(`.sort__button`)
    .forEach((element) => element.classList.remove(`sort__button--active`));
  }

  _sortTypeChangeHandler(evt) {


    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._clearSortStyle();
    evt.target.classList.add(`sort__button--active`);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

}
