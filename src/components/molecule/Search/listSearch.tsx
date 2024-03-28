import {FlatList, RefreshControl, StyleSheet, Text} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useQuery} from 'react-query';
import {widthResponsive} from '../../../utils';
import {EmployeeCard, EmptyState} from '..';
import {useSearchHook} from '../../../hooks/use-search.hook';

interface Props {
  keyword: string;
}

const ListSearch: FC<Props> = (props: Props) => {
  const {keyword} = props;
  const {getListEmployee} = useSearchHook();
  const {
    data: dataSearch,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-employee'], () => getListEmployee(keyword));

  useEffect(() => {
    refetch();
  }, [keyword]);

  const handleOnPress = (id: number) => {
    console.log('WE NEED ID TO NAVIGATE TO DETAIL');
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ListContainer}
      data={dataSearch?.data}
      scrollEnabled={true}
      renderItem={({item, index}) => (
        <EmployeeCard data={item} onPress={() => handleOnPress(index)} />
      )}
      ListEmptyComponent={
        !isLoading && !isRefetching ? (
          <EmptyState
            text={'no employee found'}
            containerStyle={styles.containerEmpty}
          />
        ) : null
      }
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    />
  );
};

export default ListSearch;

const styles = StyleSheet.create({
  ListContainer: {
    paddingBottom: widthResponsive(400),
  },
  containerEmpty: {
    flex: 0,
    height: widthResponsive(500),
  },
});
