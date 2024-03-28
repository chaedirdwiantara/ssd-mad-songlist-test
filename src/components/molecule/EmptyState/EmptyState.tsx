import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {mvs} from 'react-native-size-matters';
import Color from '../../../theme/Color';
import {widthResponsive} from '../../../utils';

interface Props {
  text: string;
  subtitle?: string;
  btnText?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  hideIcon?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const EmptyState: React.FC<Props> = (props: Props) => {
  const {text, subtitle, containerStyle, textStyle} = props;
  return (
    <View style={[styles.root, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {subtitle && <Text style={[styles.subtitle]}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Color.Neutral[10],
    textAlign: 'center',
    maxWidth: '90%',
    fontSize: mvs(15),
    fontFamily: 'Inter-Medium',
  },
  subtitle: {
    color: Color.Neutral[10],
    maxWidth: '90%',
    textAlign: 'center',
    paddingTop: widthResponsive(4),
  },
});
