import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';

import { TConstructorIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

describe('burgerConstructor slice', () => {
  const bun: TConstructorIngredient = {
    id: nanoid(),
    _id: 'bun-1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 10,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const filling1: TConstructorIngredient = {
    id: nanoid(),
    _id: 'sauce-1',
    name: 'Соус',
    type: 'sauce',
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 5,
    price: 20,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const filling2: TConstructorIngredient = {
    id: nanoid(),
    _id: 'main-1',
    name: 'Котлета',
    type: 'main',
    proteins: 15,
    fat: 20,
    carbohydrates: 0,
    calories: 200,
    price: 80,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('должен добавить начинку', () => {
    const state = reducer(undefined, addIngredient(filling1));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(filling1);
  });

  it('должен удалить начинку', () => {
    const initialState = {
      bun: null,
      ingredients: [filling1, filling2]
    };

    const state = reducer(initialState, removeIngredient(filling1.id));

    expect(state.ingredients).toEqual([filling2]);
  });

  it('должен менять порядок начинок', () => {
    const initialState = {
      bun: null,
      ingredients: [filling1, filling2]
    };

    const state = reducer(
      initialState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients).toEqual([filling2, filling1]);
  });

  it('должен очистить конструктор', () => {
    const initialState = {
      bun,
      ingredients: [filling1, filling2]
    };

    const state = reducer(initialState, clearConstructor());

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
