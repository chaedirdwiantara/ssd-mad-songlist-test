import {View} from 'react-native';
import React from 'react';
import {widthResponsive} from '../../../utils/dimensionFormat';

interface GapProps {
  height?: number;
  width?: number;
}

const Gap: React.FC<GapProps> = ({height, width}) => {
  return (
    <View
      style={{
        height: height && widthResponsive(height),
        width: width && widthResponsive(width),
      }}
    />
  );
};

export default Gap;
