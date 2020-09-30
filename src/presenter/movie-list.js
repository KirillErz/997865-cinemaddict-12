import BoardView from "../view/board.js";
import SortView from "../view/sort.js";
import FilmListView from "../view/film-list.js";
import LoadMoreButtonView from "../view/load-more-button-view.js";
import ServiceRepliesView from "../view/service-replies.js";
import MoviePresenter from "./movie.js";
import {updateItem} from "../utils/common.js";
import {render, RenderPosition} from "../utils/render.js";
import {SortType} from "../const.js";
import {sortFilmRating, sortFilmRelease} from "../utils/film-card.js";

const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderMovieCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._filmListComponent = new FilmListView();
    this._serviceRepliesComponent = new ServiceRepliesView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._moviePresenter = {};

    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardFilmsCards) {
    this._boardFilms = boardFilmsCards.slice();
    this._sourceBoardFilms = boardFilmsCards.slice();

    render(this._boardContainer, this._boardComponent.getElement(), RenderPosition.BEFOREEND);
    render(this._boardComponent, this._filmListComponent.getElement(), RenderPosition.BEFOREEND);

    this.listContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);

    this._renderBoard();
  }

  _sortFilms(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.RATING:
        this._boardFilms.sort(sortFilmRating);

        break;
      case SortType.DATE:
        this._boardFilms.sort(sortFilmRelease);
        break;
      default:
        this._boardFilms = this._sourceBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderMovieList();
  }

  _handleMovieChange(updatedMovie) {
    this._boardFilms = updateItem(this._boardFilms, updatedMovie);
    this._sourceBoardFilms = updateItem(this._sourceBoardFilms, updatedMovie);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._boardComponent, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(movie) {
    const moviePresenter = new MoviePresenter(this._filmListComponent.getElement().firstElementChild, this._handleMovieChange);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _renderFilmsCards(from, to) {
    this._boardFilms
    .slice(from, to)
    .forEach((boardFilm) => this._renderFilmCard(boardFilm));
  }

  _renderLoadMoreButton() {

    if (this._boardFilms.length > this._renderMovieCount) {
      let renderedFilmCount = this._renderMovieCount;
      render(this._boardComponent, this._loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
      this._loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._boardFilms
          .slice(renderedFilmCount, renderedFilmCount + this._renderMovieCount)
          .forEach((movie) => this._renderFilmCard(movie));
        renderedFilmCount += this._renderMovieCount;

        if (renderedFilmCount >= this._boardFilms.length) {
          this._loadMoreButtonComponent.getElement().remove();
          this._loadMoreButtonComponent.removeElement();
        }
      });
    }
  }

  _renderMovieList() {

    if (this._boardFilms.length > 0) {
      this._renderFilmsCards(0, Math.min(this._boardFilms.length, this._renderMovieCount));
    } else {
      render(this._boardComponent, this._serviceRepliesComponent.getElement(), RenderPosition.BEFOREEND);
    }

    this._renderLoadMoreButton();
  }

  _renderBoard() {

    this._renderSort();

    this._renderMovieList();
  }

  _clearFilmList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderMovieCount = FILM_COUNT_PER_STEP;
  }

}
