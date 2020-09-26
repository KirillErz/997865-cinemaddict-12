import AbstractView from "./abstract.js";
const isNotMovie = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};


export default class ServiceReplies extends AbstractView {
  getTemplate() {
    return isNotMovie();
  }
}
