import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlices';
import constructorReducer from './constructorSlice';
import ordersReducer from './ordersSlice';
import userReducer from './userSlice';
import feedReducer from './feedSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  orders: ordersReducer,
  user: userReducer,
  feed: feedReducer
});
