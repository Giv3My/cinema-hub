export const API = {
  root: (url = '') => url,
  auth: (url = '') => API.root(`/auth/${url}`),
  users: (url = '') => API.root(`/users/${url}`),
  movies: (url = '') => API.root(`/movies/${url}`),
  genres: (url = '') => API.root(`/genres/${url}`),
  actors: (url = '') => API.root(`/actors/${url}`),
  reviews: (url = '') => API.root(`/reviews/${url}`),
  files: (url = '') => API.root(`/files/${url}`),
  statistics: (url = '') => API.root(`/statistics/${url}`),
  payments: (url = '') => API.root(`/payments/${url}`),
};
