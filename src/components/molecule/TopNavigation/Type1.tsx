import {
  NativeModules,
  Platform,
  StyleSheet,
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
import {mvs} from 'react-native-size-matters';

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
          styles.headerContainer,
          {
            backgroundColor: bgColor,
          },
          containerStyles,
        ]}>
        <View style={styles.leftContainer}>{iconLeft()}</View>
        <View style={[styles.centerContainer, {flex: 5}, containerTextStyle]}>
          <Text
            numberOfLines={1}
            style={[
              styles.centerTitle,
              {color: itemStrokeColor, fontFamily: font.InterSemiBold},
            ]}>
            {elipsisText(title, maxLengthTitle ?? 20)}
          </Text>
        </View>
        <View style={styles.rightContainer}></View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type1;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: mvs(1),
    borderBottomColor: color.Dark[500],
    paddingTop:
      Platform.OS === 'ios'
        ? widthResponsive(barHeight)
        : widthResponsive(barHeight + 15),
    paddingBottom: widthResponsive(20),
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerTitle: {
    fontSize: mvs(16),
    fontFamily: font.InterSemiBold,
    // letterSpacing: 0.15,
    // textAlign: 'center',
  },
  iconLeftContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconRightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
