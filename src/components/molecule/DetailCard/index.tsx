import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {widthResponsive} from '../../../utils';
import {color} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../..';

type Props = {
  title: string;
  value: string;
};

const DetailCard: React.FC<Props> = (props: Props) => {
  const {title, value} = props;
  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.valueStyle}>
        <Text style={styles.textStyle}>:</Text>
        <Gap width={8} />
        <Text style={styles.textStyle}>{value}</Text>
      </View>
    </View>
  );
};

export default DetailCard;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginBottom: widthResponsive(10),
  },
  textContainer: {
    width: widthResponsive(90),
  },
  textStyle: {
    color: color.Neutral[10],
    fontSize: mvs(14),
  },
  valueStyle: {
    flexDirection: 'row',
  },
});
