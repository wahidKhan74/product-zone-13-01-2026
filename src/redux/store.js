import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

//1. create store
export const store = configureStore({
  reducer: rootReducer,
});