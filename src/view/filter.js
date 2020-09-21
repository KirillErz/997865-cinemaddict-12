import {createElement} from "../utils.js";

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return `<a
      href="#${name}"
      class="main-navigation__item  ${isChecked ? `main-navigation__item--active` : ``}">
      ${getNamefilter(name)}
      ${name !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``}

    </a>`;
};


const createFilterTemplate = (filters) => {

  const filterItemsTemplate = filters
  .map((filter, index) => createFilterItemTemplate(filter, index === 0))
  .join(``);

  return `<div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>`;
};

const getNamefilter = (type) => {
  switch (type) {
    case `all`:
      return `All movies`;
    case `watchlist`:
      return `Watchlist`;
    case `history`:
      return `History`;
    case `favorites`:
      return `Favorites`;
    default:
      return ``;
  }
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
