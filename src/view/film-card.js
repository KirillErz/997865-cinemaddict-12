export const createFilmCardTemplate = (movie) => {
  const {id, comments, film_info: {...film}, user_details: {...user}} = movie || {};

  const date = new Date(film.release.date).getFullYear();
  const time = (film.runtime / 60 | 0) + `h` + ` ` + (film.runtime % 60) + `m`;
  const isWatchingList = (watchlist) => {
    return

  }
  const watchingListClass = user.watchlist ? `film-card__controls-item--active` : ``;
  const alreadyWatchedClass = user.already_watched ? `film-card__controls-item--active` : ``;
  const favoriteClass = user.favorite ? `film-card__controls-item--active` : ``;

  return ` <article class="film-card">
  <h3 class="film-card__title">${film.title}</h3>
  <p class="film-card__rating">${film.total_rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${date}</span>
    <span class="film-card__duration">${time}</span>
    <span class="film-card__genre">${film.genre}</span>
  </p>
  <img src="${film.poster}" alt="${film.poster}" class="film-card__poster">
  <p class="film-card__description">${film.description}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchingListClass}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedClass}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClass}">Mark as favorite</button>
  </form>
</article>`;
};
