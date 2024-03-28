import {useState} from 'react';
import {dataList} from '../interface/dataList.interface';
import {getListDataEP} from '../api/listData';

export const uselistDataHook = () => {
  const [listData, setlistData] = useState<dataList[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getlistData = async (props: {term: string; limit?: number}) => {
    setIsLoading(true);
    try {
      const response = await getListDataEP({
        term: props.term,
        limit: props.limit,
      });
      setlistData(response.results);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    listData,
    isError,
    getlistData,
  };
};
