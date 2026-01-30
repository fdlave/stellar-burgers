export type FeedInfoUIProps = {
  feed: {
    total: number;
    totalToday: number;
    orders?: any[];
    isLoading?: boolean;
    error?: string | null;
  };
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
