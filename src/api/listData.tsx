import {responseEp} from '../interface/dataList.interface';
import baseApi from './base.api';

export const getListDataEP = async (props: {
  term: string;
  limit?: number;
}): Promise<responseEp> => {
  const {data} = await baseApi().request<responseEp>({
    url: '/search',
    method: 'GET',
    params: props,
  });

  return data;
};
