import { forwardRef, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { TIngredientsCategoryProps } from './type';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    (state) => state.burgerConstructor
  );

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    constructorIngredients.forEach((ingredient: TConstructorIngredient) => {
      const id = ingredient._id;
      counters[id] = (counters[id] || 0) + 1;
    });

    if (bun) {
      counters[bun._id] = 2;
    }

    const result: Record<string, number> = {};
    ingredients.forEach((ingredient: TIngredient) => {
      result[ingredient._id] = counters[ingredient._id] || 0;
    });

    return result;
  }, [bun, constructorIngredients, ingredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
