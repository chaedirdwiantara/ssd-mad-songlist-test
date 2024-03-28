import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {color} from '../theme';
import {widthResponsive} from '../utils';
import {EmptyState, TopNavigation} from '../components';
import {getList} from '../hooks/use-storage.hook';
import ListDataCard from '../components/molecule/ListData';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import {dataList} from '../interface/dataList.interface';

const FavoriteScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [data, setData] = useState<dataList[]>();

  useFocusEffect(
    useCallback(() => {
      setData(getList());
    }, []),
  );

  const handleOnPress = (artistData: dataList) => {
    navigation.navigate('DetailData', {data: artistData});
  };

  return (
    <View style={styles.container}>
      <TopNavigation.Type2
        title="Favorite Songs"
        itemStrokeColor={color.Neutral[10]}
      />
      <View style={styles.bodyContainer}>
        {data && (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <ListDataCard
                title={item.trackName}
                subTitle={item.artistName}
                imageUrl={item.artworkUrl60}
                onPress={() => handleOnPress(item)}
              />
            )}
            ListEmptyComponent={
              <EmptyState
                text="No Favorites Songs"
                subtitle="Try to add favorites from detail"
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default FavoriteScreen;

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
    padding: widthResponsive(20),
  },
});
