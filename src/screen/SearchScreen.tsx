import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {color} from '../theme';
import {widthResponsive} from '../utils';
import {
  EmptyState,
  LoadingIndicator,
  SearchBar,
  TopNavigation,
} from '../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import ListDataCard from '../components/molecule/ListData';
import {uselistDataHook} from '../hooks/use-dataList.hook';
import {dataList} from '../interface/dataList.interface';
import {getList} from '../hooks/use-storage.hook';
import {StarIcon} from '../assets/icon';

const SearchScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {isLoading, listData, isError, getlistData} = uselistDataHook();
  const [searchState, setSearchState] = useState<string>('');
  const [favorite, setFavorite] = useState<dataList[]>();

  useFocusEffect(
    useCallback(() => {
      setFavorite(getList());
    }, []),
  );

  const handleOnPress = (data: dataList) => {
    navigation.navigate('DetailData', {data});
  };

  const onSubmitSearch = () => {
    getlistData({term: searchState, limit: 30});
  };

  const isFavorited = (trackId: number) => {
    return favorite?.some(
      (localState: dataList) => localState.trackId === trackId,
    );
  };

  return (
    <View style={styles.container}>
      <TopNavigation.Type2
        title="SSD Search Song"
        itemStrokeColor={color.Neutral[10]}
      />
      <SearchBar
        value={searchState}
        onChangeText={(newText: string) => setSearchState(newText)}
        rightIcon={searchState !== '' && true}
        reset={() => setSearchState('')}
        onSubmitEditing={onSubmitSearch}
        containerStyle={styles.searchStyle}
      />
      {isLoading && <LoadingIndicator size="large" />}
      <View style={styles.bodyContainer}>
        {!isError && !isLoading && listData ? (
          <>
            <FlatList
              data={listData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.childrenContainer}>
                  <ListDataCard
                    title={item.trackName}
                    subTitle={item.artistName}
                    imageUrl={item.artworkUrl60}
                    onPress={() => handleOnPress(item)}
                    withIcon={isFavorited(item.trackId)}
                  />
                  {isFavorited(item.trackId) ? <StarIcon /> : <View />}
                </View>
              )}
              ListEmptyComponent={
                <EmptyState
                  text="No Song Matches"
                  subtitle="Try to find a new artist/song..."
                />
              }
            />
          </>
        ) : null}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: widthResponsive(20),
  },
  searchStyle: {
    paddingHorizontal: widthResponsive(20),
    marginVertical: widthResponsive(10),
  },
  childrenContainer: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});
