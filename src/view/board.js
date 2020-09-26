import AbstractView from "./abstract.js";

const createBoardTemplate = () => {
  return `<section class="films">
          </section>`;
};


export default class BoardView extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
