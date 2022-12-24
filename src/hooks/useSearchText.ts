import {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

interface UseSearchTextReturn {
  searchText: string;
  setSearchText: (text: string) => void;
}

export const useSearchText = (
  defaultSearchText?: string,
): UseSearchTextReturn => {
  const isFocused = useIsFocused();

  const [searchText, setSearchText] = useState<string>(defaultSearchText || '');

  useEffect(() => {
    if (!isFocused) {
      setSearchText('');
    }
  }, [isFocused]);

  return {
    searchText,
    setSearchText,
  };
};
