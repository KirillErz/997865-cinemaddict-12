
const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const FILMS = [`sagebrush-trail`, `santa-claus-conquers-the-martians`, `the-dance-of-life`, `the-great-flamarion`, `the-man-with-the-golden-arm`];
const EMOTION_LIST = [`smile`, `sleeping`, `puke`, `angry`];


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const generateFilmName = () => {
  const randomIndex = getRandomInteger(0, FILMS.length - 1);
  return FILMS[randomIndex];
};


const generatePoster = () => {
  const randomIndex = getRandomInteger(0, FILMS.length - 1);
  return `./images/posters/` + FILMS[randomIndex] + `.jpg`;
};


const generateDescription = () => {
  const arrDescription = DESCRIPTION.split(`.`);
  const count = getRandomInteger(0, arrDescription.length);
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(arrDescription[i]);
  }
  return arr.join();
};

const generateEmotion = () => {
  const randomIndex = getRandomInteger(0, EMOTION_LIST.length - 1);
  return EMOTION_LIST[randomIndex];
};

const generateIdComment = () => {
  const randomIndex = getRandomInteger(0, 100);
  return randomIndex;
};

const generateIdFilm = () => {
  const randomIndex = getRandomInteger(0, 100);
  return randomIndex;
};

const getRandomComment = () => {
  return {
    id: generateIdComment(),
    author: `Ilya O'Reilly`,
    comment: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
    date: `2019-05-11T16:12:32.554Z`,
    emotion: generateEmotion(),
  };
};

const generateComment = () => {
  const randomIndex = getRandomInteger(0, 20);
  return new Array(randomIndex).fill().map(getRandomComment);
};


export const generateRatingUser = () => {
  return {rating: getRandomInteger(1, 100)};
};

export const generateMovie = () => {
  return {
    "id": generateIdFilm(),
    "comments": generateComment(),
    "filmInfo": {
      "title": generateFilmName(),
      "alternativeTitle": `Laziness Who Sold Themselves`,
      "totalRating": getRandomInteger(1, 10),
      "poster": generatePoster(),
      "ageRating": 0,
      "director": `Tom Ford`,
      "writers": [
        `Takeshi Kitano`, `Takeshi Kitano`
      ],
      "actors": [
        `Morgan Freeman`
      ],
      "release": {
        "date": `2019-0${getRandomInteger(1, 9)}-0${getRandomInteger(1, 9)}T16:12:32.554Z`,
        "releaseCountry": `Finland`
      },
      "runtime": 73,
      "genre": [
        `Comedy`, `Drama`
      ],
      "description": generateDescription(),
    },
    "userDetails": {
      "watchlist": Boolean(getRandomInteger(0, 1)),
      "alreadyWatched": Boolean(getRandomInteger(0, 1)),
      "watchingDate": `2019-04-12T16:12:32.554Z`,
      "favorite": Boolean(getRandomInteger(0, 1)),
    }
  };
};
