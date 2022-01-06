import React from "react";
import { Provider } from "react-redux";
import generateStore from './src/redux/store';

export default ({ element }) => {
  const store = generateStore();
  return <Provider store={store}>{element}</Provider>
}