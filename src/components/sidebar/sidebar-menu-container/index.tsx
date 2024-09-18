import React from 'react';

import { adminMenu, userMenu } from './data';

import { Menu, GenreMenu } from './menu';

interface Props {
  isAdminPage: boolean;
}

export const SidebarMenuContainer: React.FC<Props> = ({ isAdminPage }) => {
  return (
    <div className="w-full flex flex-1 flex-col  ">
      <Menu menu={isAdminPage ? adminMenu : userMenu} />
      {!isAdminPage && <GenreMenu />}
    </div>
  );
};
