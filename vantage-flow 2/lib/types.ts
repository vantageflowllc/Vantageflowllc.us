export type Category = "apparel" | "footwear" | "accessories" | "lifestyle";

export interface ProductVariantColor {
  name: string;
  hex: string;
  image: string;
  hoverImage?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  collection: string;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  colors: ProductVariantColor[];
  sizes: string[];
  description: string;
  details: string[];
  materials: string;
  sku: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  total: number;
  items: { name: string; image: string; quantity: number; price: number }[];
}
