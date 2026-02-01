import { combineReducers } from '@reduxjs/toolkit';

import ingredientsReducer from '../slices/ingredientsSlices';
import constructorReducer from '../slices/constructorSlice';
import feedReducer from '../slices/feedSlice';
import userReducer from '../slices/userSlice';
import ordersReducer from '../slices/ordersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  orders: ordersReducer
});

describe('rootReducer', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const state = rootReducer(undefined, unknownAction);

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, unknownAction),
      burgerConstructor: constructorReducer(undefined, unknownAction),
      feed: feedReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction),
      orders: ordersReducer(undefined, unknownAction)
    });
  });
});
