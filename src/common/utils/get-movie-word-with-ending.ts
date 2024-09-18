export const getMovieWordWithEnding = (count: number) => {
  const remainder = count % 10;

  switch (true) {
    case remainder === 1:
      return `${count} фильм`;
    case [2, 3, 4].includes(remainder):
      return `${count} фильма`;
    default:
      return `${count} фильмов`;
  }
};
