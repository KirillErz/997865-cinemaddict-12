import AbstractView from "./abstract.js";

const createFilmCardTemplate = (movie) => {
  const {comments, filmInfo, userDetails} = movie;

  const date = new Date(filmInfo.release.date).getFullYear();
  const time = (filmInfo.runtime / 60 | 0) + `h` + ` ` + (filmInfo.runtime % 60) + `m`;

  const watchingListClass = userDetails.watchlist ? `film-card__controls-item--active` : ``;
  const alreadyWatchedClass = userDetails.alreadyWatched ? `film-card__controls-item--active` : ``;
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

export default class FilmCard extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    // зачем так делать ?
    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._watchlistHandler = this._watchlistHandler.bind(this);
    this._watchedHandler = this._watchedHandler.bind(this);
    this._favoriteHandler = this._favoriteHandler.bind(this);
  }


  getTemplate() {
    return createFilmCardTemplate(this._movie);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    this._callback.cardClick();
  }

  _watchlistHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _watchedHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }


  setOpenClickHandler(callback) {
    this._callback.cardClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._cardClickHandler);
  }

  setWatchlistHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistHandler);
  }

  setWatchedHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedHandler);
  }

  setFavoriteHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteHandler);
  }
}
