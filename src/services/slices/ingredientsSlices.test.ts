import reducer, {
  initialState,
  getIngredients
} from './ingredientsSlices';
import { TIngredient } from '@utils-types';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('ingredientsSlice', () => {
  const ingredientsMock: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 50,
      image: '',
      image_large: '',
      image_mobile: ''
    }
  ];

  it('должен устанавливать loading=true при pending', () => {
    const state = reducer(
      initialState,
      getIngredients.pending('', undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ингредиенты при fulfilled', () => {
    const state = reducer(
      initialState,
      getIngredients.fulfilled(ingredientsMock, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(ingredientsMock);
  });

  it('должен сохранять ошибку при rejected', () => {
    const error = new Error('Ошибка');

    const state = reducer(
      initialState,
      getIngredients.rejected(error, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
