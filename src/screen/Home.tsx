import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../theme';
import {widthResponsive} from '../utils';
import {
  EmptyState,
  Gap,
  LoadingIndicator,
  SearchBar,
  TopNavigation,
} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import ListDataCard from '../components/molecule/ListData';
import {uselistDataHook} from '../hooks/use-dataList.hook';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {isLoading, listData, isError, stopPagination, getlistData} =
    uselistDataHook();
  const [meta, setMeta] = useState<{page: number; limit: number}>({
    page: 1,
    limit: 15,
  });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<string>('');

  useEffect(() => {
    getlistData({page: meta.page, limit: meta.limit, refresh: false});
  }, []);

  useEffect(() => {
    if (refreshing) {
      getlistData({page: 1, limit: meta.limit, refresh: true});
    }
  }, [refreshing]);

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  const nextPage = () => {
    getlistData({page: meta.page + 1, limit: meta.limit, refresh: false});
    setMeta({
      ...meta,
      page: meta.page + 1,
    });
  };

  const handleEndScroll = () => {
    if (!stopPagination) {
      nextPage();
    }
  };

  const handleOnPress = (mal_id: number) => {
    navigation.navigate('DetailData', {id: mal_id});
  };

  const onSubmitSearch = () => {
    console.log(searchState);
  };

  return (
    <View style={styles.container}>
      <TopNavigation.Type2
        title="List Anime"
        itemStrokeColor={color.Neutral[10]}
      />
      {isLoading && listData.length == 0 && <LoadingIndicator size="large" />}
      <View style={styles.bodyContainer}>
        {refreshing && (
          <View style={styles.loadingContainer}>
            <LoadingIndicator size="small" />
          </View>
        )}
        {!isError ? (
          <>
            <Gap height={20} />
            <SearchBar
              value={searchState}
              onChangeText={(newText: string) => setSearchState(newText)}
              rightIcon={searchState !== '' && true}
              reset={() => setSearchState('')}
              onSubmitEditing={onSubmitSearch}
            />
            <FlatList
              data={listData}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              numColumns={2}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <ListDataCard
                  name={item.title}
                  imageUrl={item.images.jpg.image_url}
                  onPress={() => handleOnPress(item.mal_id)}
                />
              )}
              onEndReached={handleEndScroll}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => setRefreshing(true)}
                />
              }
            />
          </>
        ) : (
          <EmptyState text="Error" subtitle="Oops there is something error" />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
  },
  titleStyle: {
    color: color.Neutral[10],
  },
  listContainer: {
    marginTop: widthResponsive(20),
  },
  textStyle: {
    color: color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: widthResponsive(20),
  },
});
