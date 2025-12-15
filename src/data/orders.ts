export type IOrder = {
  _id: string;
  orderId: string;
  business: {
    _id: string;
    name: string;
    slug: string;
    type: "owner" | "reseller";
  };
  items: any[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  status: "processing" | "delivered";
  total: {
    value: number;
    currency: "NGN" | "USD";
  };
  createdAt: Date;
};

export const orders = [
  {
    _id: "98492892789279eijak",
    orderId: "Ord-kldklakdakdl",
    business: {
      _id: "doaidioaidoiaoido",
      name: "Lotion",
      slug: "lotion",
      type: "owner",
    },
    items: [],
    customer: {
      firstName: "Bryan",
      lastName: "Simmons",
      email: "brynasimmons@gmail.com",
    },
    status: "processing",
    total: {
      value: 10000,
      currency: "NGN",
    },
    createdAt: new Date(),
  },
  {
    _id: "dnsjdjsdjskdjkoewiow",
    orderId: "Ord-3329jhjwjhekj",
    business: {
      _id: "doaidioaidoiaoido",
      name: "Lotion",
      slug: "lotion",
      type: "reseller",
    },
    items: [],
    customer: {
      firstName: "Bryan",
      lastName: "Simmons",
      email: "brynasimmons@gmail.com",
    },
    status: "delivered",
    total: {
      value: 30000,
      currency: "NGN",
    },
    createdAt: new Date(),
  },
] as IOrder[];

export function getOrders() {
  return [];
}

export function getOrder(orderId: string) {
  return orders.find((order) => order.orderId === orderId);
}
