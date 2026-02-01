import { configureStore } from '@reduxjs/toolkit';

import ingredientsReducer from '../slices/ingredientsSlices';
import constructorReducer from '../slices/constructorSlice';
import feedReducer from '../slices/feedSlice';
import userReducer from '../slices/userSlice';
import ordersReducer from '../slices/ordersSlice';

describe('rootReducer', () => {
  it('должен возвращать initialState для каждого редьюсера', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: constructorReducer,
        feed: feedReducer,
        user: userReducer,
        orders: ordersReducer
      }
    });

    const state = store.getState();

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN' }),
      burgerConstructor: constructorReducer(undefined, { type: 'UNKNOWN' }),
      feed: feedReducer(undefined, { type: 'UNKNOWN' }),
      user: userReducer(undefined, { type: 'UNKNOWN' }),
      orders: ordersReducer(undefined, { type: 'UNKNOWN' })
    });
  });
});
