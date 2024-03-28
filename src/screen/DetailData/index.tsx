import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../../theme';
import {widthResponsive} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {mvs} from 'react-native-size-matters';
import {
  Button,
  EmptyState,
  Gap,
  LoadingIndicator,
  TopNavigation,
} from '../../components';
import {useDetailDataHook} from '../../hooks/use-dataDetail.hook';
import FastImage from 'react-native-fast-image';
import {StarIcon} from '../../assets/icon';
import {
  addItemToList,
  getList,
  isItemInList,
  removeItemFromList,
} from '../../hooks/use-storage.hook';

type PostDetailProps = NativeStackScreenProps<RootStackParams, 'DetailData'>;

const DetailData = ({route}: PostDetailProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {isLoading, isError, detailData, getDetailData, setdetailData} =
    useDetailDataHook();

  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    getDetailData({id: route.params.id});
  }, []);

  useEffect(() => {
    const checkItemStored = () => {
      const itemExists = isItemInList(route.params.id);
      setFavorite(itemExists);
    };

    checkItemStored();
  }, []);

  const leftIconOnPress = () => {
    navigation.goBack();
    setdetailData(undefined);
  };

  const buttonOnPress = () => {
    if (detailData) {
      if (favorite) {
        setFavorite(false);
        removeItemFromList(route.params.id);
      } else {
        setFavorite(true);
        addItemToList({
          id: detailData.mal_id,
          name: detailData.title,
          imageUrl: detailData?.images.jpg.image_url,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigation.Type1
        title="Detail Data"
        leftIconAction={leftIconOnPress}
        itemStrokeColor={color.Neutral[10]}
      />
      {detailData && !isError ? (
        <ScrollView style={styles.bodyContainer}>
          <FastImage
            style={{width: '100%', height: 250, borderRadius: 10}}
            source={{
              uri: detailData.images.jpg.large_image_url,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Gap height={10} />
          <Text style={styles.titleStyle}>
            {detailData.title}, {detailData.year}
          </Text>

          <Gap height={5} />
          <View style={styles.score}>
            <StarIcon width={14} height={14} />
            <Gap width={4} />
            <Text style={styles.textStyle}>{detailData.score}</Text>
            <Gap width={4} />
          </View>
          <Text style={styles.textStyle}>{detailData.rating}</Text>
          <Gap height={10} />
          <View>
            <Button
              label={favorite ? 'Favorite' : 'Add To Favorite'}
              containerStyles={styles.buttonStyle}
              onPress={buttonOnPress}
              bgColor={favorite ? color.Primary[400] : color.Secondary[200]}
            />
          </View>

          <Gap height={10} />
          <Text style={styles.textStyle}>{detailData.background}</Text>
        </ScrollView>
      ) : (
        <EmptyState text="Error" subtitle="Oops there is something error" />
      )}
      {isLoading && <LoadingIndicator />}
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
    fontSize: mvs(15),
    fontWeight: 'bold',
    color: color.Neutral[10],
  },
  textStyle: {
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
});
