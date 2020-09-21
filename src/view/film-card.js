
import {createElement} from "../utils.js";

const createFilmCardTemplate = (movie) => {

  const {comments, filmInfo, userDetails} = movie;

  const date = new Date(filmInfo.release.date).getFullYear();
  const time = (filmInfo.runtime / 60 | 0) + `h` + ` ` + (filmInfo.runtime % 60) + `m`;

  const watchingListClass = userDetails.watchlist ? `film-card__controls-item--active` : ``;
  const alreadyWatchedClass = userDetails.already_watched ? `film-card__controls-item--active` : ``;
  const favoriteClass = userDetails.favorite ? `film-card__controls-item--active` : ``;

  return `<article class="film-card">
  <h3 class="film-card__title">${filmInfo.title}</h3>
  <p class="film-card__rating">${filmInfo.totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${date}</span>
    <span class="film-card__duration">${time}</span>
    <span class="film-card__genre">${filmInfo.genre}</span>
  </p>
  <img src="${filmInfo.poster}" alt="${filmInfo.poster}" class="film-card__poster">
  <p class="film-card__description">${filmInfo.description}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchingListClass}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedClass}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClass}">Mark as favorite</button>
  </form>
</article>`;
};

export default class FilmCard {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._movie);
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
