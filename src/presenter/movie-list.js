import BoardView from "../view/board.js";
import SortView from "../view/sort.js";
import FilmListView from "../view/film-list.js";
import FilmCardView from "../view/film-card.js";
import FilmDetaildView from "../view/film-detail.js";
import LoadMoreButtonView from "../view/load-more-button-view.js";
import ServiceRepliesView from "../view/service-replies.js";
import {render, RenderPosition} from "../utils/render.js";
import {SortType} from "../const.js";
import {sortFilmRating, sortFilmRelease} from "../utils/film-card.js";

import {KEY_CODE_ESC} from "../const.js";


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
    console.log(this._boardFilms);
    this._clearFilmList();
    this._renderMovieList();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._boardComponent, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(movie) {
    const filmComponent = new FilmCardView(movie);
    const filmDetailComponent = new FilmDetaildView(movie);
    filmComponent.setOpenClickHandler(() => {
      document.body.appendChild(filmDetailComponent.getElement());
    });

    filmDetailComponent.setCloseClickHandler(() => {
      document.body.removeChild(filmDetailComponent.getElement());
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.keyCode === KEY_CODE_ESC) {
        evt.preventDefault();
        document.body.removeChild(filmDetailComponent.getElement());
      }
    });
    render(this._filmListComponent.getElement().firstElementChild, filmComponent.getElement(), RenderPosition.BEFOREEND);
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
    this._filmListComponent.getElement().firstElementChild.innerHTML = ``;
    this._renderMovieCount = FILM_COUNT_PER_STEP;
  }

}
