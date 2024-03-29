import {responseEp} from '../interface/dataList.interface';
import {getListDataEP} from '../api/listData.api';
import {useQuery} from 'react-query';
import {UseDataListQueryParams} from '../interface/base.interface';

export const useDataListQuery = (props: UseDataListQueryParams) => {
  const {data, isLoading, isError, refetch} = useQuery<responseEp, Error>(
    ['dataList', props.term, props.limit],
    () => getListDataEP(props),
    {
      enabled: false,
    },
  );

  return {data, isLoading, isError, refetch};
};
