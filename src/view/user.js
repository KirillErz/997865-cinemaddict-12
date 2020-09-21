import {createElement} from "../utils.js";

const createUserTemplate = (UserProperti) => {
  const {rating} = UserProperti;

  const getStatus = (ratingValue) => {

    switch (true) {
      case (ratingValue < 10 && ratingValue > 0):
        return `Novice`;
      case (ratingValue > 11 && ratingValue < 20):
        return `Fan`;
      case (ratingValue > 20):
        return `Movie Buff`;
      default:
        return ``;
    }
  };

  return `<section class="header__profile profile">
    <p class="profile__rating">${getStatus(rating)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class User {
  constructor(properti) {
    this._properti = properti;
    this._element = null;
  }

  getTemplate() {
    return createUserTemplate(this._properti);
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
