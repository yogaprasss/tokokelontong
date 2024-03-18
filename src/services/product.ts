import axios from 'axios';

import { baseURL } from '@/utils/constant';

export interface ProductRatingProps {
  rate: number;
  count: number
}

export interface ProductProps {
  id: string| number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRatingProps
}

export const getAllProducts = async () => {
  const path = '/products';
  const result = await axios.get(baseURL + path);
  return result.data as ProductProps[];
};

export const getProductsByCategory = async (category: string) => {
  const path = `/products/category/${category}`;
  const result = await axios.get(baseURL + path);
  return result.data as ProductProps[];
};

export const getProductById = async (id: string | number) => {
  const path = `/products/${id}`;
  const result = await axios.get(baseURL + path);
  return result.data as ProductProps;
};

export const deleteProduct = async (id: string | number) => {
  const path = `/products/${id}`;
  const result = await axios.delete(baseURL + path);
  return result.data;
};
