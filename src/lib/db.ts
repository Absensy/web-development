import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

// Типы для TypeScript
export interface Category {
  id: number;
  name: string;
  price_from: number;
  photo: string;
  discount?: number;
  discounted_price?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  short_description: string;
  full_description: string;
  materials: string;
  production_time: string;
  price: number;
  discount?: number;
  discounted_price?: number;
  image: string;
  category_id?: number;
  category?: Category;
  is_new: boolean;
  is_popular: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: number;
  address: string;
  phone: string;
  email: string;
  instagram?: string;
  working_hours: string;
  created_at: string;
  updated_at: string;
}
