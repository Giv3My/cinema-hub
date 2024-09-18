import React from 'react';

import { useDebounce } from './use-debounce';

export const useSearch = (delay: number = 500) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const debouncedSearch = useDebounce(searchTerm, delay);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return { searchTerm, debouncedSearch, handleSearch, clearSearch } as const;
};
