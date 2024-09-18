export const getRatingString = (rating: number) => {
  return [...Array(rating)].map(() => '⭐️').join(' ');
};
