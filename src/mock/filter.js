

const movieToFilterMap = {
  all: (movies) => movies.filter((movie) => movie),
  watchlist: (movies) => movies
    .filter((movie) => movie.userDetails.watchlist).length,
  history: (movies) => movies
    .filter((movie) => movie.userDetails.alreadyWatched).length,
  favorites: (movies) => movies
    .filter((movie) => movie.userDetails.favorite).length
};

export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks(movies),
    };
  });
};
