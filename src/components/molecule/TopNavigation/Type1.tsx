import {
  NativeModules,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ArrowLeftIcon} from '../../../assets/icon';
import {elipsisText, widthResponsive} from '../../../utils';
import topNavstyles from './topNavstyles';
import {color, font} from '../../../theme';

/** === INTERFACE === */
type Props = {
  title: string;
  maxLengthTitle?: number;
  bgColor?: string;
  itemStrokeColor?: string;
  leftIcon?: React.ReactNode;
  leftIconAction: () => void;
  containerStyles?: ViewStyle;
  containerTextStyle?: ViewStyle;
};

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

/** == COMPONENT === */
const Type1: React.FC<Props> = (props: Props) => {
  const {
    title,
    maxLengthTitle,
    bgColor,
    itemStrokeColor,
    leftIcon,
    leftIconAction,
    containerStyles,
    containerTextStyle,
  } = props;

  /** => icon left */
  const iconLeft = () => {
    return (
      <TouchableOpacity
        style={topNavstyles.iconLeftContainer}
        onPress={leftIconAction}>
        {leftIcon ? (
          leftIcon
        ) : (
          <ArrowLeftIcon
            stroke={color.Neutral[10]}
            style={{marginLeft: widthResponsive(10)}}
          />
        )}
      </TouchableOpacity>
    );
  };

  /** => header */
  const header = () => {
    return (
      <View
        style={[
          topNavstyles.headerContainer,
          {
            backgroundColor: bgColor,
          },
          containerStyles,
        ]}>
        <View style={topNavstyles.leftContainer}>{iconLeft()}</View>
        <View
          style={[topNavstyles.centerContainer, {flex: 5}, containerTextStyle]}>
          <Text
            numberOfLines={1}
            style={[
              topNavstyles.centerTitle,
              {color: itemStrokeColor, fontFamily: font.InterSemiBold},
            ]}>
            {elipsisText(title, maxLengthTitle ?? 20)}
          </Text>
        </View>
        <View style={topNavstyles.rightContainer}></View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type1;
