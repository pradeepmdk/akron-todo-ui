import React from 'react';
import './App.css';
import Navigation from './Navigation';
import { Provider } from 'react-redux'
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

export default App;
