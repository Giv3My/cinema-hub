import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/common/constants';
import type { Menu } from './types';

export const userMenu: Menu = {
  title: 'Меню',
  items: [
    {
      icon: 'LuCompass',
      link: PUBLIC_ROUTES.home(),
      value: 'Главная',
    },
    {
      icon: 'LuClapperboard',
      link: PUBLIC_ROUTES.explorer(),
      value: 'Фильмы',
    },
    {
      icon: 'LuFlame',
      link: PUBLIC_ROUTES.trending(),
      value: 'Популярные',
    },
  ],
};

export const adminMenu: Menu = {
  title: 'Меню',
  items: [
    {
      icon: 'LuLayoutDashboard',
      link: ADMIN_ROUTES.home(),
      value: 'Статистика',
    },
    {
      icon: 'LuUsers',
      link: ADMIN_ROUTES.users(),
      value: 'Пользователи',
    },
    {
      icon: 'LuTv',
      link: ADMIN_ROUTES.movies(),
      value: 'Фильмы',
    },
    {
      icon: 'LuBook',
      link: ADMIN_ROUTES.genres(),
      value: 'Жанры',
    },
    {
      icon: 'LuBookDown',
      link: ADMIN_ROUTES.actors(),
      value: 'Актеры',
    },
    {
      icon: 'LuStar',
      link: ADMIN_ROUTES.reviews(),
      value: 'Отзывы',
    },
    {
      icon: 'LuDollarSign',
      link: ADMIN_ROUTES.payments(),
      value: 'Платежи',
    },
  ],
};
