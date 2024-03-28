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
import {FeedScreen, HomeScreen, AddEmployee} from '../screen';

// Screen
import {LoginScreen} from '../screen/Login';
import {SplashScreen} from '../screen/SplashScreen';
import DetailData from '../screen/DetailData';

// Icon
import {FeedIcon, HomeIcon, ProfileIcon, SearchIcon} from '../assets/icon';

// interface

export type RootStackParams = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  MainTab: undefined;
  DetailData: {id: number};
};

export type MainTabParams = {
  Feed: undefined;
  Home: undefined;
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <TouchableOpacity
              style={styles.root}
              onPress={() => navigation.navigate('Home')}>
              <HomeIcon stroke={color} />
              <Text style={[styles.label, {color}]}>{'Home'}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={styles.root}>
              <FeedIcon stroke={color} />
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
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
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
