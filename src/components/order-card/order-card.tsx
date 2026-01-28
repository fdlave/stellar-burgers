import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

import { OrderCardProps } from './type';
import { TIngredient, TOrder } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const { ingredients, loading } = useSelector((state) => state.ingredients);

  const orderInfo = useMemo(() => {
    if (!ingredients.length || loading) return null;

    const ingredientsMap = new Map<string, TIngredient>();
    ingredients.forEach((ing: TIngredient) => {
      ingredientsMap.set(ing._id, ing);
    });

    const ingredientsInfo: TIngredient[] = [];
    let total = 0;

    order.ingredients.forEach((ingredientId: string) => {
      const ingredient = ingredientsMap.get(ingredientId);
      if (ingredient) {
        ingredientsInfo.push(ingredient);
        total += ingredient.price;
      }
    });

    if (ingredientsInfo.length === 0) return null;

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);
    const remains = Math.max(0, ingredientsInfo.length - maxIngredients);
    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients, loading]);

  if (loading && ingredients.length === 0) {
    return <div className='p-4'>Загрузка...</div>;
  }

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
