import {createUserTemplate} from "./view/user.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmDetailsTemplate} from "./view/film-detail.js";
import {createBoardTemplate} from "./view/board-films.js";
import {createStatisticFilmsTemplate} from "./view/statistic-films.js";

const MOVIE_CARDS = 5;
const MOVIE_CARDS_EXTRA = 2;

const RenderPosition = {
  BEFO: `beforeend`,
  AFTE: `afterend`
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const countFilmsElement = document.querySelector(`.footer__statistics`);

render(headerElement, createUserTemplate(), RenderPosition.BEFO);
render(mainElement, createMenuTemplate(), RenderPosition.BEFO);
render(mainElement, createFilterTemplate(), RenderPosition.BEFO);
render(mainElement, createBoardTemplate(), RenderPosition.BEFO);

const cardsContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < MOVIE_CARDS; i++) {
  render(cardsContainer, createFilmCardTemplate(), RenderPosition.BEFO);
}

const extraListFilms = document.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < extraListFilms.length; i++) {
  for (let j = 0; j < MOVIE_CARDS_EXTRA; j++) {
    const containerFilms = extraListFilms[i].querySelector(`.films-list__container`);
    render(containerFilms, createFilmCardTemplate(), RenderPosition.BEFO);
  }
}

render(countFilmsElement, createStatisticFilmsTemplate(), RenderPosition.BEFO);
render(footerElement, createFilmDetailsTemplate(), RenderPosition.AFTE);
