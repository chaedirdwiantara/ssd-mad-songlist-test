import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {dataList} from '../../../interface/dataList.interface';
import {color} from '../../../theme';
import {widthResponsive} from '../../../utils';
import FastImage from 'react-native-fast-image';

interface ListDataCardProps {
  imageUrl: string;
  name: string;
  onPress: () => void;
  disabled?: boolean;
}

const ListDataCard: React.FC<ListDataCardProps> = (
  props: ListDataCardProps,
) => {
  const {imageUrl, name, onPress, disabled = false} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      disabled={disabled}>
      <FastImage
        style={{width: '100%', height: 200, borderRadius: 10}}
        source={{
          uri: imageUrl,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.textStyle} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default ListDataCard;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(10),
    borderWidth: 1,
    borderColor: color.Pink[200],
    borderRadius: 10,
    marginBottom: widthResponsive(10),
    marginHorizontal: widthResponsive(10),
    width: widthResponsive(140),
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
