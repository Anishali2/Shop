import React from 'react';

import MainNav from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persister} from './src/redux/store';

import CreateProduct from './src/screens/ManageMyStore/CreateProduct';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <MainNav />
      </PersistGate>
    </Provider>
  );
};

export default App;
