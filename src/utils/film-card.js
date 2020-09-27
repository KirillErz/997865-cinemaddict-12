

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};


export const sortFilmRelease = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  if (weight !== null) {
    return weight;
  }

  return filmA.filmInfo.release.date - filmB.filmInfo.release.date;
};

export const sortFilmRating = (filmA, filmB) => {
  return filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
};
