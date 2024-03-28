import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {color} from '../../../theme';
import {widthResponsive} from '../../../utils';
import FastImage from 'react-native-fast-image';
import {Gap} from '../..';
import {mvs} from 'react-native-size-matters';

interface ListDataCardProps {
  imageUrl: string;
  title: string;
  subTitle: string;
  onPress: () => void;
  disabled?: boolean;
}

const ListDataCard: React.FC<ListDataCardProps> = (
  props: ListDataCardProps,
) => {
  const {imageUrl, title, subTitle = 'N/A', onPress, disabled = false} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      disabled={disabled}>
      <FastImage
        style={{width: 50, height: 50, borderRadius: 10}}
        source={{
          uri: imageUrl,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Gap width={20} />
      <View>
        <Text style={styles.titleStyle} numberOfLines={1}>
          {title}
        </Text>
        <Gap height={3} />
        <Text style={styles.subTitleStyle} numberOfLines={1}>
          {subTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListDataCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: widthResponsive(10),
    width: '100%',
  },
  titleStyle: {
    color: color.Neutral[10],
    fontWeight: 'bold',
    fontSize: mvs(13),
  },
  subTitleStyle: {
    color: color.Neutral[50],
    fontSize: mvs(12),
  },
});
