import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { clearConstructor } from '../../services/slices/constructorSlice';
import {
  createOrder,
  clearCurrentOrder
} from '../../services/slices/ordersSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const constructorItems = useSelector((state) => state.burgerConstructor);

  const bun = constructorItems.bun;
  const ingredients = constructorItems.ingredients;

  const { orderRequest, currentOrder } = useSelector((state) => state.orders);
  const isAuthenticated = useSelector((state) => state.user.isAuth);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ing: TConstructorIngredient) => ing._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={currentOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
