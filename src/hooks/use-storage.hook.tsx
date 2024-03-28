import {MMKV} from 'react-native-mmkv';
import {dataList} from '../interface/dataList.interface';

const storage = new MMKV();

// ? Add Item into storage
export const addItemToList = (item: dataList) => {
  const currentListString = storage.getString('favoriteAnime');
  const currentList = currentListString ? JSON.parse(currentListString) : [];
  const updatedList = [...currentList, item];
  storage.set('favoriteAnime', JSON.stringify(updatedList));
};

// ? Retrieves the list from storage
export const getList = () => {
  const listString = storage.getString('favoriteAnime');
  return listString ? JSON.parse(listString) : [];
};

// ? Removes a data in List storage by its ID
export const removeItemFromList = (itemId: number) => {
  const currentListString = storage.getString('favoriteAnime');
  const currentList = currentListString ? JSON.parse(currentListString) : [];
  const updatedList = currentList.filter(
    (item: dataList) => item.trackId !== itemId,
  );
  storage.set('favoriteAnime', JSON.stringify(updatedList));
};

// ? check storage
export function isItemInList(itemId: number) {
  const currentListString = storage.getString('favoriteAnime');
  if (!currentListString) return false;

  const currentList = JSON.parse(currentListString);
  return currentList.some((item: dataList) => item.trackId === itemId);
}
