import React from 'react';

import { SearchInput } from '@/components/search-input';
import { ManageCreateButton } from './manage-create-button';
import styles from './manage-header.module.scss';

interface Props {
  searchTerm: string;
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: VoidFunction;
}

export const ManageHeader: React.FC<Props> = ({ searchTerm, handleSearch, onClick }) => {
  return (
    <div className={styles.header}>
      <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
      {onClick && <ManageCreateButton onClick={onClick} />}
    </div>
  );
};
