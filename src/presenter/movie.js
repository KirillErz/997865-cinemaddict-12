import FilmCardView from "../view/film-card.js";
import FilmDetaildView from "../view/film-detail.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {KEY_CODE_ESC} from "../const.js";
import AbstractView from "../view/abstract.js";

export default class Movie extends AbstractView {
  constructor(movieListContainer, changeData) {
    super();
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;

    this._filmComponent = null;
    this._filmDetailComponent = null;

    this. _handlOpenClick = this. _handlOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleWatchlist = this._handleWatchlist.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorite = this._handleFavorite.bind(this);

  }

  init(movie) {
    this._movie = movie;
    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailComponent = this._filmDetailComponent;
    this._filmComponent = new FilmCardView(this._movie);
    this._filmDetailComponent = new FilmDetaildView(this._movie);

    this._filmComponent.setOpenClickHandler(this. _handlOpenClick);
    this._filmComponent.setWatchlistHandler(this._handleWatchlist);
    this._filmComponent.setWatchedHandler(this._handleWatched);
    this._filmComponent.setFavoriteHandler(this._handleFavorite);

    this._filmDetailComponent.setCloseClickHandler(this._handleCloseClick);


    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === KEY_CODE_ESC) {
        evt.preventDefault();
        document.body.removeChild(this._filmDetailComponent.getElement());
      }
    });

    if (prevFilmComponent === null || prevFilmDetailComponent === null) {
      render(this._movieListContainer, this._filmComponent.getElement(), RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._movieListContainer.contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._movieListContainer.contains(prevFilmDetailComponent.getElement())) {
      replace(this._filmDetailComponent, prevFilmDetailComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailComponent);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailComponent);
  }

  _handlOpenClick() {
    document.body.appendChild(this._filmDetailComponent.getElement());
  }

  _handleCloseClick() {
    document.body.removeChild(this._filmDetailComponent.getElement());
  }

  _handleWatchlist() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              userDetails: {
                // не нашел способ как выставить только однму свойству в вложенном объекте
                watchlist: !this._movie.userDetails.watchlist,
                alreadyWatched: this._movie.userDetails.alreadyWatched,
                watchingDate: this._movie.userDetails.watchingDate,
                favorite: this._movie.userDetails.favorite
              }
            }));
  }

  _handleWatched() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              userDetails: {
                // не нашел способ как выставить только однму свойству в вложенном объекте
                watchlist: this._movie.userDetails.watchlist,
                alreadyWatched: !this._movie.userDetails.alreadyWatched,
                watchingDate: this._movie.userDetails.watchingDate,
                favorite: this._movie.userDetails.favorite
              }
            }));
  }

  _handleFavorite() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              userDetails: {
                // не нашел способ как выставить только однму свойству в вложенном объекте
                watchlist: this._movie.userDetails.watchlist,
                alreadyWatched: this._movie.userDetails.alreadyWatched,
                watchingDate: this._movie.userDetails.watchingDate,
                favorite: !this._movie.userDetails.favorite
              }
            }));
  }

}
