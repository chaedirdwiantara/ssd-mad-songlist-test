import {useState} from 'react';
import {dataList} from '../interface/dataList.interface';
import {getListDataEP} from '../api/listData';

export const uselistDataHook = () => {
  const [listData, setlistData] = useState<dataList[]>([]);
  const [stopPagination, setStopPagination] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getlistData = async (props: {
    page: number;
    limit: number;
    refresh?: boolean;
  }) => {
    setIsLoading(true);
    try {
      const response = await getListDataEP({
        page: props.page,
        limit: props.limit,
      });
      if (response.pagination.has_next_page === false) {
        setStopPagination(true);
      }
      if (props.page === 1) {
        setlistData(response.data);
      } else {
        if (listData.length > 1 && response) {
          if (props.refresh) {
            setlistData(response.data);
          } else {
            const updateList = listData.concat(response.data);
            setlistData(updateList);
          }
        }
      }
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
    stopPagination,
    getlistData,
  };
};
