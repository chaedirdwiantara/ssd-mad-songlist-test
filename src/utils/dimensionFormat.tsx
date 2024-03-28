import {Dimensions} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export const {height, width} = Dimensions.get('screen');

export const widthResponsive = (value: number = 0, maxValue: number = 375) => {
  const widthPercent = widthPercentageToDP((value / maxValue) * 100);

  return widthPercent;
};
