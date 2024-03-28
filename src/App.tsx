import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackScreen} from './navigations';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './service/queryClient';

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <RootStackScreen />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
