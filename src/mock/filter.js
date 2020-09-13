

const movieToFilterMap = {
  all: (movies) => movies.filter((movie) => movie),
  watchlist: (movies) => movies
    .filter((movie) => movie.user_details.watchlist).length,
  history: (movies) => movies
    .filter((movie) => movie.user_details.already_watched).length,
  favorites: (movies) => movies
    .filter((movie) => movie.user_details.favorite).length
};

export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks(movies),
    };
  });
};
