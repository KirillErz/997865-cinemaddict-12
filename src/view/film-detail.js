
import {createElement} from "../utils.js";

const createFilmDetailsTemplate = (movie) => {
  const {comments, filmInfo, userDetails} = movie || {};


  const writers = filmInfo.writers.join(`, `);
  const actors = filmInfo.actors.join(`, `);
  const monthRelease = new Date(filmInfo.release.date).toLocaleString(`en-US`, {month: `long`});
  const dayRelease = new Date(filmInfo.release.date).toLocaleString(`en-US`, {day: `numeric`});
  const yearRelease = new Date(filmInfo.release.date).toLocaleString(`en-US`, {year: `numeric`});
  const releaseDate = (dayRelease + monthRelease + yearRelease);
  const time = (filmInfo.runtime / 60 | 0) + `h` + ` ` + (filmInfo.runtime % 60) + `m`;

  const watchingListClass = userDetails.watchlist ? `film-card__controls-item--active` : ``;
  const alreadyWatchedClass = userDetails.alreadyWatched ? `film-card__controls-item--active` : ``;
  const favoriteClass = userDetails.favorite ? `film-card__controls-item--active` : ``;


  const createGenreTemplate = filmInfo.genre.map((value) => {
    return `<span class="film-details__genre">${value}</span>`;
  }).join(``);

  // Обман
  const description = filmInfo.description.length > 139 ? filmInfo.description.substr(0, 139) + `(...)` : filmInfo.description;

  const fomationDateComment = (date) => {
    const monthComment = new Date(date).toLocaleString(`en-US`, {month: `numeric`});
    const dayComment = new Date(date).toLocaleString(`en-US`, {day: `numeric`});
    const yearComment = new Date(date).toLocaleString(`en-US`, {year: `numeric`});
    const timeComment = new Date(date).toLocaleString(`en-GB`, {hour: `2-digit`, minute: `2-digit`, second: `2-digit`});
    return yearComment + `/` + monthComment + `/` + dayComment + `/` + timeComment;
  };

  const createCommentTemplate = () => {
    return comments.map((value) => {
      return ` <li class="film-details__comment>
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${value.emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${value.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${value.author}</span>
          <span class="film-details__comment-day">${fomationDateComment(value.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
    }).join(``);
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

          <p class="film-details__age">${filmInfo.ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.title}</h3>
              <p class="film-details__title-original">Original: ${filmInfo.alternative_title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${time}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo.release.release_country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${createGenreTemplate}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden ${watchingListClass}" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden ${alreadyWatchedClass}" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden ${favoriteClass}" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list">
          ${createCommentTemplate()}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};


export default class FilmDetail {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._movie);
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
