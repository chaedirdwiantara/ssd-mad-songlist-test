import {useState} from 'react';
import {getSearchEmployeeEP} from '../api/search.api';

export const useSearchHook = () => {
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const getListEmployee = async (search: string) => {
    setSearchLoading(true);
    try {
      const response = await getSearchEmployeeEP({
        search: search,
      });
      return {
        data: response,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return {searchLoading, getListEmployee};
};
