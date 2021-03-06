import {createElement} from "../utils.js";

const createSiteMenuTemplate = () => {
  return `<nav class="main-navigation">
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

// что такое default
export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate();
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
