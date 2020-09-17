import {createUserTemplate} from "./view/user.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createBoardTemplate} from "./view/board-films.js";
import {createStatisticFilmsTemplate} from "./view/statistic-films.js";
import {createFilmDetailsTemplate} from "./view/film-detail.js";
import {generateMovie, generateRatingUser} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {isNotMovie} from "./view/service-replies.js";
import {renderTemplate} from "./utils.js";



const COUNT_OF_DISPLAYED_MOVIE = 5;
const MOVIE_CARDS = 6;
const MOVIE_CARDS_EXTRA = 2;




const movies = new Array(MOVIE_CARDS).fill().map(generateMovie);
const ratingUser = generateRatingUser();
const filters = generateFilter(movies);



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

render(headerElement, createUserTemplate(ratingUser), RenderPosition.BEFO);
render(mainElement, createMenuTemplate(filters), RenderPosition.BEFO);
render(mainElement, createFilterTemplate(), RenderPosition.BEFO);
render(mainElement, createBoardTemplate(), RenderPosition.BEFO);

const cardsContainer = document.querySelector(`.films-list__container`);


const renderFilmCard = (movies) => {
  if ( movies.length > 0) {
    for (let i = 0; i < COUNT_OF_DISPLAYED_MOVIE; i++) {
      if ( i < movies.length) {
        render(cardsContainer, createFilmCardTemplate(movies[i]), RenderPosition.BEFO);
      }
    }
  } else {
    render(cardsContainer, isNotMovie(), RenderPosition.BEFO);
  }
  if (movies.length <= COUNT_OF_DISPLAYED_MOVIE) {
    buttonShowMore.classList.add(`visually-hidden`);
  }
}
const buttonShowMore = document.querySelector(`.films-list__show-more`);

renderFilmCard(movies);


buttonShowMore.addEventListener('click', () => {
  const countRendered = Array.from(document.querySelectorAll(`.film-card`)).length;
  const countIsNotRendered = movies.length - countRendered;
  let willBeRendered = 0;

  if (countIsNotRendered >= COUNT_OF_DISPLAYED_MOVIE) {
    willBeRendered = countRendered + COUNT_OF_DISPLAYED_MOVIE;
  }
  else {
    willBeRendered = countIsNotRendered + countRendered;
  }

  for (let i = countRendered; i < willBeRendered; i++) {
    render(cardsContainer, createFilmCardTemplate(movies[i]), RenderPosition.BEFO);
  }
  if (willBeRendered === movies.length) {
    buttonShowMore.classList.add(`visually-hidden`);
  }

});


const extraListFilms = document.querySelectorAll(`.films-list--extra`);

// for (let i = 0; i < extraListFilms.length; i++) {
//   for (let j = 0; j < MOVIE_CARDS_EXTRA; j++) {
//     const containerFilms = extraListFilms[i].querySelector(`.films-list__container`);
//     render(containerFilms, createFilmCardTemplate(movies[i]), RenderPosition.BEFO);
//   }
// }

render(countFilmsElement, createStatisticFilmsTemplate(), RenderPosition.BEFO);
render(footerElement, createFilmDetailsTemplate(movies[0]), RenderPosition.AFTE);
