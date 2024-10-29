import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import TodoScreen from './ToDoScreen';

const Redux2 = () => {
  return (
    <Provider store={store}>
      <TodoScreen/>
    </Provider>
  );
};

export default Redux2;
