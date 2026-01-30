import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  fetchOrderByNumber,
  clearCurrentOrder
} from '../../services/slices/ordersSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const { ingredients, loading: ingredientsLoading } = useSelector(
    (state) => state.ingredients
  );
  const { currentOrder, isLoading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!number) return;

    const orderNumber = Number(number);
    if (isNaN(orderNumber)) return;

    if (!currentOrder || currentOrder.number !== orderNumber) {
      dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [dispatch, number, currentOrder]);

  const orderInfo = useMemo(() => {
    if (!currentOrder || !ingredients.length || ingredientsLoading) return null;

    const date = new Date(currentOrder.createdAt);

    const ingredientsMap = new Map<string, TIngredient>();
    ingredients.forEach((ing: TIngredient) => {
      ingredientsMap.set(ing._id, ing);
    });

    type TIngredientsWithCount = Record<
      string,
      TIngredient & { count: number }
    >;
    const ingredientsInfo: TIngredientsWithCount = {};

    currentOrder.ingredients.forEach((ingredientId: string) => {
      const ingredient = ingredientsMap.get(ingredientId);
      if (ingredient) {
        if (!ingredientsInfo[ingredientId]) {
          ingredientsInfo[ingredientId] = {
            ...ingredient,
            count: 1
          };
        } else {
          ingredientsInfo[ingredientId].count++;
        }
      }
    });

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...currentOrder,
      ingredientsInfo,
      date,
      total
    };
  }, [currentOrder, ingredients, ingredientsLoading]);

  if (isLoading || ingredientsLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-default text_color_error'>
        Ошибка загрузки заказа: {error}
      </div>
    );
  }

  if (!orderInfo) {
    return <div className='text text_type_main-default'>Заказ не найден</div>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
