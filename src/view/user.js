export const createUserTemplate = (UserProperties) => {
  const {rating} = UserProperties;

  const getStatus = (ratingValue) => {
    let status = ``;
    switch (true) {
      case (ratingValue < 10 && ratingValue > 0):
        status = `Novice`;
        break;
      case (ratingValue > 11 && ratingValue < 20):
        status = `Fan`;
        break;
      case (ratingValue > 20):
        status = `Movie Buff`;
        break;
      default:
        status = ``;
    }
    return status;
  };

  return `<section class="header__profile profile">
    <p class="profile__rating">${getStatus(rating)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
