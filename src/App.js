import React from 'react';

import {
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { createStore } from 'redux';
import reducers from './redux/reducers';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';

import AppContainer from './AppContainer';

const store = createStore(reducers);

export default App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >
            <AppContainer />
          </ScrollView>
        </SafeAreaView>
      </NativeBaseProvider>
    </Provider>
  );
};
