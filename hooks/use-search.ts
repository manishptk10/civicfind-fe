import { useEffect, useState } from 'react';

interface UseSearchOptions {
  initialSearch?: string;
  debounceMs?: number;
}

export function useSearch(options: UseSearchOptions = {}) {
  const { initialSearch = '', debounceMs = 400 } = options;

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [search, debounceMs]);

  return {
    search,
    setSearch,
    debouncedSearch,
  };
}
