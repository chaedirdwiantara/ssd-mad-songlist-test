import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../../theme';
import {dateFormatter, widthResponsive} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {mvs} from 'react-native-size-matters';
import {Button, Gap, TopNavigation} from '../../components';
import FastImage from 'react-native-fast-image';
import {
  addItemToList,
  isItemInList,
  removeItemFromList,
} from '../../hooks/use-storage.hook';

type PostDetailProps = NativeStackScreenProps<RootStackParams, 'DetailData'>;

const DetailData = ({route}: PostDetailProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [favorite, setFavorite] = useState<boolean>(false);

  const data = route.params.data;

  useEffect(() => {
    const checkItemStored = () => {
      const itemExists = isItemInList(data.trackId);
      setFavorite(itemExists);
    };

    checkItemStored();
  }, []);

  const leftIconOnPress = () => {
    navigation.goBack();
  };

  const buttonOnPress = () => {
    if (favorite) {
      setFavorite(false);
      removeItemFromList(data.trackId);
    } else {
      setFavorite(true);
      addItemToList(data);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigation.Type1
        title="Detail Data"
        leftIconAction={leftIconOnPress}
        itemStrokeColor={color.Neutral[10]}
      />

      <ScrollView style={styles.bodyContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.imageStyle}
            source={{
              uri: data.artworkUrl100,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Gap height={10} />
        <Text style={styles.titleStyle}>{data.trackName}</Text>
        <Text style={styles.subTitleStyle}>{data.artistName}</Text>
        <Text style={[styles.subTitleStyle, {fontSize: mvs(11)}]}>
          {dateFormatter(data.releaseDate)}
        </Text>
        <Gap height={10} />
        <Button
          label={favorite ? 'Favorite' : 'Add To Favorite'}
          containerStyles={styles.buttonStyle}
          onPress={buttonOnPress}
          bgColor={favorite ? color.Primary[400] : color.Secondary[200]}
        />
        <Gap height={10} />
        <Text style={styles.descStyle}>
          Desc:{' '}
          {data.longDescription
            ? data.longDescription
            : data.description ?? '-'}
        </Text>
      </ScrollView>
    </View>
  );
};

export default DetailData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  titleStyle: {
    color: color.Neutral[10],
    fontWeight: 'bold',
    fontSize: mvs(18),
  },
  subTitleStyle: {
    color: color.Neutral[50],
    fontSize: mvs(16),
  },
  descStyle: {
    fontSize: mvs(13),
    color: color.Neutral[10],
  },
  bodyContainer: {
    padding: widthResponsive(20),
  },
  score: {
    flexDirection: 'row',
  },
  buttonStyle: {
    width: widthResponsive(120),
    height: undefined,
    aspectRatio: undefined,
    padding: widthResponsive(8),
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imageStyle: {
    width: widthResponsive(100),
    height: widthResponsive(100),
    borderRadius: 10,
  },
});
