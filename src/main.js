import MovieListPresenter from "./presenter/movie-list.js";
import User from "./view/user.js";
import SiteMenu from "./view/menu.js";
import Filter from "./view/filter.js";
import Statistic from "./view/statistic-films.js";
import {generateMovie, generateRatingUser} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition, remove} from "./utils/render.js";



const MOVIE_CARDS = 10;
const MOVIE_CARDS_EXTRA = 2;




const movies = new Array(MOVIE_CARDS).fill().map(generateMovie);
const ratingUser = generateRatingUser();
const filters = generateFilter(movies);



const menuComponent = new SiteMenu();
const statComponent = new Statistic();

const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

render(headerElement, new User(ratingUser).getElement(), RenderPosition.BEFOREEND);



render(siteMainElement, menuComponent.getElement(), RenderPosition.BEFOREEND);
render(menuComponent.getElement(), new Filter(filters).getElement(), RenderPosition.AFTERBEGIN);

const boardPresenter = new MovieListPresenter(siteMainElement);

boardPresenter.init(movies);






render(footerElement, statComponent.getElement(), RenderPosition.BEFOREEND);
