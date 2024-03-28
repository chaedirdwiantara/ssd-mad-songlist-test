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
  const {isLoading, listData, isError, getlistData} = uselistDataHook();
  const [searchState, setSearchState] = useState<string>('');

  const handleOnPress = (mal_id: number) => {
    navigation.navigate('DetailData', {id: mal_id});
  };

  const onSubmitSearch = () => {
    getlistData({term: searchState, limit: 30});
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
        {!isError && !isLoading ? (
          <>
            <FlatList
              data={listData}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <ListDataCard
                  title={item.trackName}
                  subTitle={item.artistName}
                  imageUrl={item.artworkUrl100}
                  onPress={() => handleOnPress(2)}
                />
              )}
              ListEmptyComponent={
                <EmptyState
                  text="Error"
                  subtitle="Oops there is something error"
                />
              }
            />
          </>
        ) : null}
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
    width: '100%',
    paddingHorizontal: widthResponsive(20),
  },
  listContainer: {
    marginTop: widthResponsive(20),
  },
  searchStyle: {
    paddingHorizontal: widthResponsive(20),
    marginTop: widthResponsive(10),
  },
});
