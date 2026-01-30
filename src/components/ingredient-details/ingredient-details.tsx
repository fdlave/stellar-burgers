import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients, loading, error } = useSelector(
    (state) => state.ingredients
  );

  const ingredientData = useMemo(() => {
    if (!id || !ingredients.length) return null;
    return ingredients.find((ing: TIngredient) => ing._id === id);
  }, [ingredients, id]);

  if (loading && ingredients.length === 0) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-default text_color_error'>
        Ошибка загрузки ингредиентов: {error}
      </div>
    );
  }

  if (!ingredientData) {
    return (
      <div className='text text_type_main-default'>Ингредиент не найден</div>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
