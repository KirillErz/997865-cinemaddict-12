import User from "./view/user.js";
import SiteMenu from "./view/menu.js";
import Filter from "./view/filter.js";
import Sort from "./view/sort.js";
import BoardView from "./view/board.js";
import FilmListView from "./view/film-list.js";
import FilmCard from "./view/film-card.js";
import LoadMoreButtonView from "./view/load-more-button-view.js";
import Statistic from "./view/statistic-films.js";
import FilmDetail from "./view/film-detail.js";
import {generateMovie, generateRatingUser} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {isNotMovie} from "./view/service-replies.js";
import {renderTemplate, render} from "./utils.js";



const FILM_COUNT_PER_STEP = 5;
const MOVIE_CARDS = 6;
const MOVIE_CARDS_EXTRA = 2;




const movies = new Array(MOVIE_CARDS).fill().map(generateMovie);
const ratingUser = generateRatingUser();
const filters = generateFilter(movies);



const RenderPosition = {
  BEFO: `beforeend`,
  AFTE: `afterbegin`
};

const menuComponent = new SiteMenu();
const boardComponent = new BoardView();
const filmListComponent = new FilmListView();
const statComponent = new Statistic();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const renderFilm = (listContainer, movie) => {
  const filmComponent = new FilmCard(movie);
  const filmDetailComponent = new FilmDetail(movie);
  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    document.body.appendChild(filmDetailComponent.getElement());
  })

  filmDetailComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    document.body.removeChild(filmDetailComponent.getElement());
  })
  render(listContainer, filmComponent.getElement(), RenderPosition.BEFO);
}

render(headerElement, new User(UserProperties).getElement(), RenderPosition.BEFO);



render(mainElement, menuComponent.getElement(), RenderPosition.BEFO);
render(menuComponent.getElement(), new Filter(filters).getElement(), RenderPosition.AFTE);
render(mainElement, new Sort().getElement(), RenderPosition.BEFO);

render(mainElement, boardComponent.getElement(), RenderPosition.BEFO);

render(boardComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFO);


const listContainer  = filmListComponent.getElement().querySelector(`.films-list__container`);


for (let i = 0; i < Math.min(movies.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(listContainer, movies[i]);
}

if (movies.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  const loadMoreButtonComponent = new LoadMoreButtonView();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFO);
  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((movie) => renderFilm(listContainer, movie));

      renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= movies.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

render(footerElement, statComponent.getElement(), RenderPosition.BEFO);
