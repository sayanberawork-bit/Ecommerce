export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 79999,
    image: "https://via.placeholder.com/300?text=iPhone+15+Pro",
    category: "Electronics",
    description: "Latest Apple iPhone with advanced features",
    rating: 4.8,
  },
  {
    id: 2,
    name: "MacBook Pro 14",
    price: 159999,
    image: "https://via.placeholder.com/300?text=MacBook+Pro",
    category: "Laptops",
    description: "Professional laptop with M3 chip",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 4999,
    image: "https://via.placeholder.com/300?text=Headphones",
    category: "Audio",
    description: "Noise-cancelling wireless headphones",
    rating: 4.5,
  },
  {
    id: 4,
    name: "iPad Air",
    price: 59999,
    image: "https://via.placeholder.com/300?text=iPad+Air",
    category: "Tablets",
    description: "Powerful tablet for productivity",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    price: 44999,
    image: "https://via.placeholder.com/300?text=Apple+Watch",
    category: "Wearables",
    description: "Advanced health tracking smartwatch",
    rating: 4.6,
  },
  {
    id: 6,
    name: "AirPods Pro",
    price: 24999,
    image: "https://via.placeholder.com/300?text=AirPods+Pro",
    category: "Audio",
    description: "Premium in-ear wireless earbuds",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Magic Keyboard",
    price: 12999,
    image: "https://via.placeholder.com/300?text=Magic+Keyboard",
    category: "Accessories",
    description: "Wireless keyboard with backlight",
    rating: 4.5,
  },
  {
    id: 8,
    name: "USB-C Cable",
    price: 1999,
    image: "https://via.placeholder.com/300?text=USB-C+Cable",
    category: "Accessories",
    description: "High-speed USB-C charging cable",
    rating: 4.3,
  },
  {
    id: 9,
    name: "Smart Display",
    price: 19999,
    image: "https://via.placeholder.com/300?text=Smart+Display",
    category: "Smart Home",
    description: "Voice-controlled smart display",
    rating: 4.4,
  },
  {
    id: 10,
    name: "Portable Charger",
    price: 3999,
    image: "https://via.placeholder.com/300?text=Portable+Charger",
    category: "Accessories",
    description: "20000mAh fast charging power bank",
    rating: 4.6,
  },
];
