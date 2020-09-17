export const createMenuTemplate = (filterItems) => {

  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

const getNamefilter = (type) => {
  switch (type) {
    case `all`:
      return `All movies`;
    case `watchlist`:
      return `Watchlist`;
    case `history`:
      return `History`;
    case `favorites`:
      return `Favorites`;
    default:
      return ``;
  }
};

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return (`<a
      href="#${name}"
      class="main-navigation__item  ${isChecked ? `main-navigation__item--active` : ``}">
      ${getNamefilter(name)}
      ${name !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``}

    </a>`);

};
