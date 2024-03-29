import {UseDataListQueryParams} from '../interface/base.interface';
import {responseEp} from '../interface/dataList.interface';
import baseApi from './base.api';

export const getListDataEP = async (
  props: UseDataListQueryParams,
): Promise<responseEp> => {
  const {data} = await baseApi().request<responseEp>({
    url: '/search',
    method: 'GET',
    params: props,
  });

  return data;
};
