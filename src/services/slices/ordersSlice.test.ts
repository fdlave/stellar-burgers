import reducer, {
  fetchOrders,
  createOrder,
  clearCurrentOrder,
  clearOrderRequest
} from './ordersSlice';
import { TOrder } from '@utils-types';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn(),
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

describe('ordersSlice', () => {
  const orderMock: TOrder = {
    _id: 'order-1',
    ingredients: [],
    status: 'done',
    name: 'Test order',
    number: 12345,
    createdAt: '',
    updatedAt: ''
  };

  const ordersMock: TOrder[] = [orderMock];

  it('fetchOrders.pending → isLoading=true', () => {
    const state = reducer(undefined, fetchOrders.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchOrders.fulfilled → сохраняет список заказов', () => {
    const state = reducer(
      undefined,
      fetchOrders.fulfilled(ordersMock, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(ordersMock);
  });

  it('fetchOrders.rejected → сохраняет ошибку', () => {
    const state = reducer(
      undefined,
      fetchOrders.rejected(null, '', undefined, 'Ошибка')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('createOrder.pending → orderRequest=true', () => {
    const state = reducer(
      undefined,
      createOrder.pending('', [])
    );

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('createOrder.fulfilled → сохраняет currentOrder', () => {
    const state = reducer(
      undefined,
      createOrder.fulfilled(orderMock, '', [])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.currentOrder).toEqual(orderMock);
  });

  it('createOrder.rejected → сохраняет ошибку', () => {
    const state = reducer(
      undefined,
      createOrder.rejected(null, '', [], 'Ошибка создания заказа')
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });

  it('clearCurrentOrder очищает currentOrder', () => {
    const preloadedState = {
      orders: [],
      currentOrder: orderMock,
      orderRequest: false,
      isLoading: false,
      error: null
    };

    const state = reducer(preloadedState, clearCurrentOrder());
    expect(state.currentOrder).toBeNull();
  });

  it('clearOrderRequest сбрасывает orderRequest', () => {
    const preloadedState = {
      orders: [],
      currentOrder: null,
      orderRequest: true,
      isLoading: false,
      error: null
    };

    const state = reducer(preloadedState, clearOrderRequest());
    expect(state.orderRequest).toBe(false);
  });
});
