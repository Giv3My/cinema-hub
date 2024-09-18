export const formatMovieRating = (movieRating: number) => {
  const rating = movieRating.toFixed(1);

  if (rating.split('.')[1] !== '0') {
    return rating;
  }

  return rating.slice(0, 1);
};
