import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { orders, total, totalToday, loading, error } = useSelector(
    (state) => state.feed
  );

  const readyOrders = useMemo(() => getOrders(orders, 'done'), [orders]);
  const pendingOrders = useMemo(() => getOrders(orders, 'pending'), [orders]);

  const feed = useMemo(
    () => ({
      total,
      totalToday,
      orders,
      loading,
      error
    }),
    [total, totalToday, orders, loading, error]
  );

  if (loading && orders.length === 0) {
    return <div>Загрузка ленты заказов...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки: {error}</div>;
  }

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
