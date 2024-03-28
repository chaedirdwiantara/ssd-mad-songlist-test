import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../../../theme';

type Props = {
  size?: 'small' | 'large';
};

const LoadingIndicator: React.FC<Props> = (props: Props) => {
  const {size} = props;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size ?? 'large'} color={color.Pink[200]} />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
