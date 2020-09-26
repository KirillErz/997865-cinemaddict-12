import AbstractView from "./abstract.js";

const createListFilmTemplate = () => {
  return `<section class="films-list">
  <div class="films-list__container">
  </div>
</section>`;
};


export default class FilmListView extends AbstractView {
  getTemplate() {
    return createListFilmTemplate();
  }
}
