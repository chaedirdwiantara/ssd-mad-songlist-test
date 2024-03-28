import {useState} from 'react';
import {getDetailDataEP} from '../api/detailData.api';
import {dataDetailIF} from '../interface/detailData.interface';

export const useDetailDataHook = () => {
  const [detailData, setdetailData] = useState<dataDetailIF>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getDetailData = async (props: {id: number}) => {
    setIsLoading(true);
    try {
      const response = await getDetailDataEP({
        id: props.id,
      });
      setdetailData(response.data);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    detailData,
    setdetailData,
    getDetailData,
  };
};
