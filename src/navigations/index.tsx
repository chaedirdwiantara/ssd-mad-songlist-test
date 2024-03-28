import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {color, font} from '../theme';
import {normalize} from '../utils/formatter';

// Main
import {FavoriteScreen, SearchScreen} from '../screen';

// Screen
import {SplashScreen} from '../screen/SplashScreen';
import DetailData from '../screen/DetailData';

// Icon
import {SearchIcon, StarIcon} from '../assets/icon';
import {dataList} from '../interface/dataList.interface';

// interface

export type RootStackParams = {
  SplashScreen: undefined;
  MainTab: undefined;
  DetailData: {data: dataList};
};

export type MainTabParams = {
  Favorite: undefined;
  Search: undefined;
  AddEmployee: undefined;
};

const screenOption: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const MainTab = createBottomTabNavigator<MainTabParams>();
const TabScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: color.Pink[200],
        tabBarInactiveTintColor: color.Dark[300],
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 0,
          height: Platform.OS === 'ios' ? 60 : 64,
          backgroundColor: '#0F1319',
          borderTopColor: color.Dark[800],
        },
      }}>
      <MainTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => (
            <TouchableOpacity
              style={styles.root}
              onPress={() => navigation.navigate('Search')}>
              <SearchIcon stroke={color} />
              <Text style={[styles.label, {color}]}>{'Search'}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={styles.root}>
              <StarIcon stroke={color} />
              <Text style={[styles.label, {color}]}>{'Favorites'}</Text>
            </View>
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

const RootStack = createNativeStackNavigator<RootStackParams>();
export const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={screenOption}
    initialRouteName={'SplashScreen'}>
    <RootStack.Screen name="MainTab" component={TabScreen} />
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="DetailData" component={DetailData} />
  </RootStack.Navigator>
);

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: font.InterMedium,
    fontSize: normalize(12),
    marginTop: 2,
  },
});
