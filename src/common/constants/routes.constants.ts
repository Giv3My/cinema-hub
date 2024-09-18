export const PUBLIC_ROUTES = {
  root: (url = '') => url,
  home: () => PUBLIC_ROUTES.root('/'),
  auth: () => PUBLIC_ROUTES.root('/auth'),
  explorer: () => PUBLIC_ROUTES.root('/explorer'),
  trending: () => PUBLIC_ROUTES.root('/trending'),
  actor: (slug = '') => PUBLIC_ROUTES.root(`/actor/${slug}`),
  genre: (slug = '') => PUBLIC_ROUTES.root(`/genre/${slug}`),
  movie: (slug = '') => PUBLIC_ROUTES.root(`/movie/${slug}`),
  premium: () => PUBLIC_ROUTES.root('/premium'),
};

export const DASHBOARD_ROUTES = {
  root: (url = '') => (url ? `/dashboard/${url}` : '/dashboard'),
  home: () => DASHBOARD_ROUTES.root(),
  favorites: () => DASHBOARD_ROUTES.root('favorites'),
};

export const ADMIN_ROUTES = {
  root: (url = '') => (url ? `/manage/${url}` : '/manage'),
  home: () => ADMIN_ROUTES.root(),
  users: () => ADMIN_ROUTES.root('users'),
  userEdit: (id = '') => ADMIN_ROUTES.root(`users/${id}`),
  movies: () => ADMIN_ROUTES.root('movies'),
  movieEdit: (id = '') => ADMIN_ROUTES.root(`movies/${id}`),
  genres: () => ADMIN_ROUTES.root('genres'),
  genreEdit: (id = '') => ADMIN_ROUTES.root(`genres/${id}`),
  actors: () => ADMIN_ROUTES.root('actors'),
  actorEdit: (id = '') => ADMIN_ROUTES.root(`actors/${id}`),
  reviews: () => ADMIN_ROUTES.root('reviews'),
  payments: () => ADMIN_ROUTES.root('payments'),
};
