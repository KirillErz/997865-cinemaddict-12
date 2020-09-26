import AbstractView from "./abstract.js";

const createLoadMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class LoadMoreButtonView extends AbstractView {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }
}
