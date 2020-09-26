import AbstractView from "./abstract.js";

const createStatisticFilmsTemplate = () => {
  return `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`;
};

export default class Statistic extends AbstractView {
  getTemplate() {
    return createStatisticFilmsTemplate();
  }
}
