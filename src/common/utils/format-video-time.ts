export const formatVideoTime = (time: number) => {
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, '0');

  const hoursExists = hours !== '00';

  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, '0');

  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');

  return (hoursExists ? hours + ':' : '') + minutes + ':' + seconds;
};
