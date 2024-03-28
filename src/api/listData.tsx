import {responseEp} from '../interface/dataList.interface';
import baseApi from './base.api';

export const getListDataEP = async (props: {
  page: number;
  limit: number;
}): Promise<responseEp> => {
  const {data} = await baseApi().request<responseEp>({
    url: '/anime',
    method: 'GET',
    params: props,
  });

  return data;
};
