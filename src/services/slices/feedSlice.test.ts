import reducer, { getFeeds } from './feedSlice';

type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

type TFeedsResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('feedSlice', () => {
  let initialState: TFeedState;

  beforeEach(() => {
    initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    };
  });

  it('должен устанавливать loading при pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать orders при fulfilled', () => {
    const payload: TFeedsResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          ingredients: [],
          status: 'done',
          name: 'Заказ 1',
          number: 1,
          createdAt: '2026-02-01T10:00:00Z',
          updatedAt: '2026-02-01T10:00:00Z'
        }
      ],
      total: 10,
      totalToday: 5
    };

    const action = { type: getFeeds.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
    expect(state.error).toBeNull();
  });

  it('должен записывать error при rejected', () => {
    const action = { type: getFeeds.rejected.type, payload: 'Ошибка' };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
