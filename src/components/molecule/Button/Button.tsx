import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  View,
  ActivityIndicator,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {widthResponsive} from '../../../utils';
import {color} from '../../../theme';

interface ButtonProps {
  label: string;
  type?: string;
  bgColor?: string;
  borderColor?: string;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle | undefined;
  disabled?: boolean;
  onPress?: () => void;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    type,
    label,
    bgColor,
    borderColor,
    containerStyles,
    textStyles,
    disabled,
    onPress,
    isLoading,
  } = props;

  const withBorder = type === 'border' && {
    borderWidth: ms(1),
    borderColor: borderColor ? borderColor : Color.Success[400],
    backgroundColor: 'transparent',
  };

  return (
    <TouchableOpacity
      style={[styles(bgColor).root, withBorder, containerStyles]}
      disabled={disabled}
      testID={'ssu-button'}
      onPress={onPress}>
      <View style={styles().childrenContainer}>
        {!isLoading ? (
          <Text style={[styles().labelStyle, textStyles]}>{label}</Text>
        ) : (
          <ActivityIndicator size="small" color={color.Neutral[10]} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = (bgColor?: string) =>
  StyleSheet.create({
    root: {
      width: widthResponsive(279),
      height: undefined,
      aspectRatio: widthResponsive(279 / 40),
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: bgColor ?? Color.Success[400],
    },
    labelStyle: {
      fontSize: mvs(12),
      color: Color.Neutral[10],
      fontFamily: Font.InterMedium,
    },
    childrenContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
