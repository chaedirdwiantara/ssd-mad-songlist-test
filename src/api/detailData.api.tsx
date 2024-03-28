import {detailResponse} from '../interface/detailData.interface';
import baseApi from './base.api';

export const getDetailDataEP = async (props: {
  id: number;
}): Promise<detailResponse> => {
  const {data} = await baseApi().request<detailResponse>({
    url: `/anime/${props.id}/full`,
    method: 'GET',
  });

  return data;
};
