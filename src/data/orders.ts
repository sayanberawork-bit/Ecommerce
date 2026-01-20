export interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  date: string;
  items: OrderItem[];
  status: "pending" | "processing" | "shipped" | "delivered";
  paymentId?: string;
}

export const orders: Order[] = [
  {
    id: "ORD001",
    userId: "2",
    total: 84998,
    date: "2026-01-10",
    status: "delivered",
    items: [
      { id: 1, name: "iPhone 15 Pro", qty: 1, price: 79999 },
      { id: 3, name: "Wireless Headphones", qty: 1, price: 4999 },
    ],
    paymentId: "pay_12345",
  },
  {
    id: "ORD002",
    userId: "2",
    total: 159999,
    date: "2026-01-05",
    status: "shipped",
    items: [{ id: 2, name: "MacBook Pro 14", qty: 1, price: 159999 }],
    paymentId: "pay_12346",
  },
  {
    id: "ORD003",
    userId: "2",
    total: 104998,
    date: "2025-12-28",
    status: "delivered",
    items: [
      { id: 4, name: "iPad Air", qty: 1, price: 59999 },
      { id: 5, name: "Apple Watch Series 9", qty: 1, price: 44999 },
    ],
    paymentId: "pay_12347",
  },
];
