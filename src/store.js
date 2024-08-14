// src/store.js
import { createStore } from 'redux';
import rootReducer from './Redux/Reducer/main'; 

export const store = createStore(rootReducer);
